var mqtt = require ("mqtt");
var watchdog_influxdb = require ("./watchdog_influxdb.js");

function Start()
{
  OnStart();
}

function OnStart()
{
  var mqttbroker = mqtt.connect('mqtt://localhost:1883');
  mqttbroker.on ('connect', OnConnectToBroker);
  mqttbroker.on ('disconnect', OnDisconnectToBroker);
}

function OnConnectToBroker()
{
  console.log ("mqtt_clientconsumer connected to mqtt broker...");
}

function OnDisconnectToBroker()
{
  console.log ("mqtt_clientconsumer disconnected to mqtt broker...");
}

exports.Start = Start;
