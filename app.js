const pm2 = require('pm2');
const pmx = require('pmx');
const Sentry = require("@sentry/node");

const conf = pmx.initModule();

pm2.launchBus(function(err, pm2_bus) {
  Sentry.init({
    dsn: conf.dsn,
    enableLogs: true,
  });
  const processes = conf.processes ? conf.processes.split(",") : null;

  pm2_bus.on('log:*', function(type, packet) {
    if (!processes || (processes.length > 0 && !processes.includes(packet.process.name))) {
      // Send only logs for processes defined in config. If processes is not defined, nothing will be send
      return false;
    }

    try {
      // send pm2 logs in json format if set
      const data = JSON.parse(packet.data || "");
      const message = (conf.message_field) ? data[conf.message_field] || packet.data : packet.data;
      if (conf.message_field && data[conf.message_field]) {
        // do not repeat the message field in the additional data
        delete data[conf.message_field];
      }
      Sentry.logger.info(message, data);
    } catch (e) {
      // send pm2 logs as string message if unable to parse json
      Sentry.logger.info(packet.data);
    }
  })
})