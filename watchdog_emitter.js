var EventEmitter = require('events').EventEmitter;

var influxdb_event = new EventEmitter();

var influxdb_event_online = 'online';
var influxdb_event_offline = 'offline';

exports.influxdb_event = influxdb_event ;
exports.influxdb_event_online = influxdb_event_online;
exports.influxdb_event_offline = influxdb_event_offline;
