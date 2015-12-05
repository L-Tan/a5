/**
 * Created by longtan on 12/5/15.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    User = mongoose.model('User');

/**
 * Recommend sketch by average rating.
 */
exports.recommendByRating = function (req, res) {
    Sketchpad.find().sort('-avgRating').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];
        if (sketch == 0) {
            res.json(result);
        } else {
            sketchs.forEach(function(entry, index, list){
                User.findById(entry.authorId).exec(function(err,user) {
                    if (err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    entry.author = user.displayName;
                    entry.authorImageURL = user.profileImageURL;
                    result.push(entry);
                    if (index == list.length - 1 || index == 4){
                        res.json(result);
                    }
                });

            });
        }

    });
};

/**
 * Recommend sketch by rated times.
 */
exports.recommendByRatedTimes = function (req, res) {
    Sketchpad.find().sort('-ratedTimes').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];

        if (sketch == 0) {
            res.json(result);
        } else {
            sketchs.forEach(function(entry, index, list){
                User.findById(entry.authorId).exec(function(err,user) {
                    if (err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    entry.author = user.displayName;
                    entry.authorImageURL = user.profileImageURL;
                    result.push(entry);
                    if (index == list.length - 1 || index == 4){
                        res.json(result);
                    }
                });

            });
        }
    });
};

