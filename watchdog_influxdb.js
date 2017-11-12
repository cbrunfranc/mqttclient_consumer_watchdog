var config = require ('./config.js');

var influx = require ('influx');
var influxdb = new influx.InfluxDB ({host: config.influx_host, database: config.influx_db, schema : []});

var watchdog_emitter = require("./watchdog_emitter.js");

function Start()
{
    OnStart();
}

function OnStart()
{
  influxdb.ping(5000).then(hosts => {
    hosts.forEach(host => {
      if (host.online  &&  host.url.host == config.influx_host) {
        console.log('influxdb (' + host.url.host + ') is online');
        watchdog_emitter.influxdb_event.emit (watchdog_emitter.influxdb_event_online,'');
      } else {
        console.log('influxdb ('+ host.url.host +') is offline');
      }
    })
  })
}

exports.influxdb = influxdb;
exports.Start = Start;
