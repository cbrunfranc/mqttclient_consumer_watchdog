var mqtt = require ("mqtt");

function Start()
{
  var mqttbroker = mqtt.connect('mqtt://localhost:1883');
  //to do : init la valeur to state = not working
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
