var mqtt = require ("mqtt");
var watchdog_influxdb = require ("./watchdog_influxdb.js");

var influxdb_event = require("./watchdog_emitter.js").influxdb_event;

function Start()
{
  influxdb_event.on('online',OnStart);
}

function OnStart()
{
  var mqttbroker = mqtt.connect('mqtt://localhost:1883');
  mqttbroker.on ('connect', OnConnectToBroker);
  mqttbroker.on ('disconnect', OnDisconnectToBroker);
}

function OnConnectToBroker()
{
  //Set 1 in DB
  console.log ("mqtt_clientconsumer connected to mqtt broker...");
}

function OnDisconnectToBroker()
{
  //Set 0 in DB
  console.log ("mqtt_clientconsumer disconnected to mqtt broker...");
}

exports.Start = Start;
