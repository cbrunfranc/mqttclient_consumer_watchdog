var influx_config = {};
influx_config.influx_host = 'localhost:8086' ;
influx_config.influx_db = 'express_response_db';

var mqttbroker_config = {};
mqttbroker_config.mqttbroker_host = 'mqtt://localhost:1883';

exports.influx_config = influx_config;
exports.mqttbroker_config = mqttbroker_config;
