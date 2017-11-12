var influx = require ('influx');
var influx_status = '';

function Start()
{
  OnStart();
}

function OnStart()
{
  //use ping - and set a variable
   var influx_connection  = new influx.InfluxDB ({host: 'localhost:3000',
   database: 'express_response_db', schema : []});
}

/*
influx.ping(5000).then(hosts => {
  hosts.forEach(host => {
    if (host.online) {
      console.log(`${host.url.host} responded in ${host.rtt}ms running ${host.version})`)
    } else {
      console.log(`${host.url.host} is offline :(`)
    }
  })
})
*/

exports.influx_status = 0;
exports.Start = Start;


/*
var influx = new Influx.InfluxDB({
  host: 'localhost:3000',
  database: 'express_response_db',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
        'host'
      ]
    }
  ]
})


influx.getDatabaseNames()
  .then(names => {
    console.log ('a');
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  })
  .then(() => {
    console.log('b');
    app.listen (3000);
    http.createServer(app).listen(3000, function () {
      console.log('Listening on port 3000')
    })
  })
  .catch(err => {
    console.log (err.stack);
    console.error(`Error creating Influx database!`);
  })

  app.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.path} took ${duration}ms`);

    influx.writePoints([
      {
        measurement: 'response_times',
        tags: { host: 'test' os.hostname() },
        fields: { duration, path: req.path },
      }
    ]).catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    })
  })
  return next()
})

app.get('/', function (req, res) {
  setTimeout(() => res.end('Hello world!'), Math.random() * 500)
})

app.get('/times', function (req, res) {
  influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit('test' os.hostname())}
    order by time desc
    limit 10
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//exports.test = test;
*/
