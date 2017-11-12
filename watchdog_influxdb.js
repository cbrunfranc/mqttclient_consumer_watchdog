var influx = require ('influx');
var influxdb ;

var influxdb_event = require("./watchdog_emitter.js").influxdb_event;

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
        console.log('influxdb (' + host.url.host + ') is online');
        influxdb_event.emit ('online','');
      } else {
        console.log('influxdb ('+ host.url.host +') is offline');
      }
    })
  })
}

exports.influxdb = influxdb;
exports.Start = Start;
