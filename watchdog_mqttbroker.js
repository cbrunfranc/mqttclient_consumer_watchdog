var config = require ('./config.js');

var mqtt = require ("mqtt");
var watchdog_influxdb = require ("./watchdog_influxdb.js");

var watchdog_emitter = require("./watchdog_emitter.js");

function Start()
{
  watchdog_emitter.influxdb_event.on(watchdog_emitter.influxdb_event_online,OnStart);
}

function OnStart()
{
  var mqttbroker = mqtt.connect(config.mqttbroker_host);
  mqttbroker.on ('connect', OnConnectToBroker);
  mqttbroker.on ('disconnect', OnDisconnectToBroker);
}

function OnConnectToBroker()
{
  UpdateState(1);
  console.log ("mqtt_clientconsumer connected to mqtt broker...");
}

function OnDisconnectToBroker()
{
  UpdateState(0);
  //console.log ("mqtt_clientconsumer disconnected to mqtt broker...");
}


function UpdateState(currentState)
{
    watchdog_influxdb.influxdb.writePoints([
      {
        measurement: 'watchdog',
        tags: { host: 'mqttbroker' },
        fields: { state: currentState },
      }
    ])
  }

exports.Start = Start;
