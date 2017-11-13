var config = require ('./config.js');

var mqtt = require ("mqtt");
var watchdog_influxdb = require ("./watchdog_influxdb.js");

var watchdog_emitter = require("./watchdog_emitter.js");

var mqttbroker_currentstate = 0;

function Start()
{
  //watchdog_emitter.influxdb_event.on('error', (err) => {console.log('error')});
  watchdog_emitter.influxdb_event.on(watchdog_emitter.influxdb_event_online,OnStart);
}

function OnStart()
{
  //watchdog_emitter.influxdb_event.emit('error');
  var mqttbroker = mqtt.connect(config.mqttbroker_config.mqttbroker_host);
  mqttbroker.on ('connect', OnConnectToBroker);
  mqttbroker.on ('close', OnDisconnectToBroker);
  setInterval (UpdateState, 1000);
}

function OnConnectToBroker()
{
  mqttbroker_currentstate = 1
}

function OnDisconnectToBroker()
{
  mqttbroker_currentstate = 0;
}

function UpdateState()
{
    watchdog_influxdb.influxdb.writePoints([
      {
        measurement: 'watchdog2',
        tags: { host: 'mqttbroker2' },
        fields: { state: mqttbroker_currentstate},
      }
    ])
  }

exports.Start = Start;
