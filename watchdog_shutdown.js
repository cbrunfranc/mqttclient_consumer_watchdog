var watchdog_watchdog = require ("./watchdog_watchdog.js");

function Initialize()
{
  //watchdog - intercep uncaught exception for clean close
    process.on('uncaughtException', (err) => {
    GracefulShutdown(err);
  });

  //watchdog - intercep unhandle rejection for clean close
  process.on('unhandledRejection', (err) => {
    GracefulShutdown(err);
  });

  //watchdog - attach SIGINT event for clean close
  onSIGINTevent();
};

function onSIGINTevent()
{
  if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }

  process.on("SIGINT", function () {
    GracefulShutdown();
  });

}

function GracefulShutdown(err)
{
  console.log ("Graceful shutdown ....");
  if (err)
  {
    console.log ('-----------------------------');
    console.log (err.stack);
    console.log ('-----------------------------');
  }
  watchdog_watchdog.Close();
  setTimeout (function () {process.exit(); }, 1000);
}

exports.Initialize = Initialize ;
exports.GracefulShutdown = GracefulShutdown ;
