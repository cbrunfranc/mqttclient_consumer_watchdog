var config = require ("./config.js");
var watchdog_watchdog = require ("./watchdog_watchdog.js");
var watchdog_influxdb = require ("./watchdog_influxdb.js");
var watchdog_mqttbroker = require ("./watchdog_mqttbroker.js");
var watchdog_shutdown = require ("./watchdog_shutdown.js");

function Start()
{
  try
  {
    //watchdog - initialize event for a graceful shutdown
    watchdog_shutdown.Initialize();

    //watchdog - started
    watchdog_watchdog.Start();

    //Watchdog - MQTT Broker
    watchdog_mqttbroker.Start();

    //Watchdog - MQTT Client Consumer
    //watchdog_mqttclientconsumer.Start();

    //watchdog - InfluxDB Database
    //the influxdb watchdog will emit a message to start all watchdogs
    //as message will be stored in the Influx database
    watchdog_influxdb.Start();
  }
  catch (err)
  {
    watchdog_shutdown.GracefulShutdown(err);
  }
}

Start();
