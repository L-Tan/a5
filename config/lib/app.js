
/**
 * Module dependencies.
 */
var config = require('../config'),
    mongoose = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk'),
    seed = require('./seed'),
    cluster = require('cluster'),
    http = require('http'),
    numCPUs = require('os').cpus().length;

function seedDB() {
    if (config.seedDB && config.seedDB.seed) {
        seed.start();
    }
}

// Initialize Models
mongoose.loadModels(seedDB);

module.exports.loadModels = function loadModels() {
    mongoose.loadModels();
};

module.exports.init = function init(callback) {
    mongoose.connect(function (db) {
        // Initialize express
        var app = express.init(db);
        if (callback) callback(app, db, config);

    });
};




module.exports.start = function start(callback) {
    var _this = this;

    _this.init(function (app, db, config) {
        if (cluster.isMaster) {

            // Logging initialization
            console.log('--');
            console.log(chalk.green(config.app.title));
            //console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
            console.log(chalk.green('Port:\t\t\t\t' + config.port));
            console.log(chalk.green('Database:\t\t\t\t' + config.db.uri));
            if (process.env.NODE_ENV === 'secure') {
                console.log(chalk.green('HTTPs:\t\t\t\ton'));
            }
            console.log(chalk.green('App version:\t\t\t' + config.meanjs.version));
            if (config.meanjs['meanjs-version'])
                console.log(chalk.green('MEAN.JS version:\t\t\t' + config.meanjs['meanjs-version']));
            console.log('Server running at http://127.0.0.1:' + config.port + '/');
            console.log('--');
            // Fork workers.

            for (var i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', function(worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
            });
        } else {

            // Start the app by listening on <port>
            app.listen(3000, function () {
                //// Logging initialization
                //console.log('--');
                //console.log(chalk.green(config.app.title));
                ////console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
                //console.log(chalk.green('Port:\t\t\t\t' + config.port));
                //console.log(chalk.green('Database:\t\t\t\t' + config.db.uri));
                //if (process.env.NODE_ENV === 'secure') {
                //    console.log(chalk.green('HTTPs:\t\t\t\ton'));
                //}
                //console.log(chalk.green('App version:\t\t\t' + config.meanjs.version));
                //if (config.meanjs['meanjs-version'])
                //    console.log(chalk.green('MEAN.JS version:\t\t\t' + config.meanjs['meanjs-version']));
                //console.log('Server running at http://127.0.0.1:' + config.port + '/');
                //console.log('--');

                if (callback) callback(app, db, config);
            });
        }

    });

};