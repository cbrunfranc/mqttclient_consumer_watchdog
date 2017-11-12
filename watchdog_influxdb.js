var influx = require ('influx');
var influxdb ;

var emitter = require("./watchdog_emitter.js");

function Start()
{
    OnStart();
}

function OnStart()
{
  influxdb  = new influx.InfluxDB ({host: 'localhost:8086', database: 'express_response_db', schema : []});
  influxdb.ping(5000).then(hosts => {
    hosts.forEach(host => {
      if (host.online  &&  host.url.host == 'localhost:8086') {
        emitter.jeu.emit ('influx','');
        console.log('influxdb (' + host.url.host + ') is online');
      } else {
        console.log('influxdb ('+ host.url.host +') is offline');
      }
    })
  })
}

exports.influxdb = influxdb;
exports.Start = Start;
