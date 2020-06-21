let Deployment = require('../models/Deployment');
let Template = require('../models/Template');
let mongoose = require('mongoose');

module.exports = {
    add(req, res, next) {
        const deployment = new Deployment({
            _id: new mongoose.Types.ObjectId(),
            url: req.body.url,
            template: req.body.template,
            version: req.body.version,
            date: req.body.date
        });
        deployment.save().then(result => {
            res.status(201).json({
                message: "Deployment registered successfully!",
                isSuccess: true,
                details: { ...result }
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        })
    },
    delete(req, res, next) {
        let { id } = req.body;
        Deployment.deleteOne({ _id: id }).then((result) => {
            Deployment.find({}).then((result) => {
                res.status(200).json({
                    isSuccess: true,
                    result: result
                });
            })
        })
    },
    getAll(req, res) {
        Deployment.find({}).then((result) => {
            res.status(200).json({
                isSuccess: true,
                result: result
            });
        })
    },
    getAllTemplates(req, res) {
        Template.find({}).then((result) => {
            res.status(200).json({
                isSuccess: true,
                result: result
            });
        })
    }
}