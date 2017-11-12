var watchdog_influxdb = require ("./watchdog_influxdb.js");

var watchdog_emitter = require("./watchdog_emitter.js");

var watchdog_currentstate = 0;

function Start()
{
  console.log ("mqttclient_consumer_watchdog is starting...");
  watchdog_emitter.influxdb_event.on(watchdog_emitter.influxdb_event_online,OnStart);
}

function OnStart()
{
  watchdog_currentstate = 1;
  UpdateState(watchdog_currentstate);
}

function Close()
{
  OnClose();
}

function OnClose()
{
  watchdog_currentstate = 0;
  UpdateState(watchdog_currentstate);
}

function UpdateState()
{
    watchdog_influxdb.influxdb.writePoints([
      {
        measurement: 'watchdog2',
        tags: { host: 'watchdog' },
        fields: { state: watchdog_currentstate},
      }
    ])
  }

exports.Start = Start;
exports.Close = Close;
