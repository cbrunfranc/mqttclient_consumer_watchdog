var config = require ("./config.js");
var watchdog_watchdog = require ("./watchdog_watchdog.js");
var watchdog_influxdb = require ("./watchdog_influxdb.js");
var watchdog_mqttbroker = require ("./watchdog_mqttbroker.js");

function Start()
{
  //watchdog - started
  watchdog_watchdog.OnStart();

  //Watchog - MQTT Broker
  watchdog_mqttbroker.Start();

  //watchdog - InfluxDB Database
  watchdog_influxdb.Start();
}

Start();
