
/**
 * Module dependencies.
 */
var config = require('../config'),
    mongoose = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk'),
    seed = require('./seed');


function seedDB() {
    if (config.seedDB && config.seedDB.seed) {
        console.log(chalk.bold.red('When you first time run the program.'));
        console.log(chalk.bold.red('System will create one suparadmin for you'));
        console.log(chalk.bold.red('Password is generated for you'));
        console.log(chalk.bold.red('Please remember the password, or change it later'));
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

        // Start the app by listening on <port>
        app.listen(3000, function () {
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

            if (callback) callback(app, db, config);
        });

    });

};