var config = require ("./config.js");
var watchdog_mqttbroker = require ("./watchdog_mqttbroker.js");

function Start()
{
  console.log ("mqttclient_consumer_watchdog is starting...");
  watchdog_mqttbroker.Start();
}

Start();
