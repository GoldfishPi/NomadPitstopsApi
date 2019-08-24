const express = require('express');
const router = express.Router();
const model = require('./../models/pitstop');

router.post('/', (req, res, next) => {
    model
        .find()
        .sort({ id: -1 })
        .limit(1)
        .then(entry => {
            let newPitstop = new model({
                name: req.body.name,
                notes: req.body.notes,
                connection: req.body.connection,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                id: entry[0] ? entry[0].id + 1 : 0,
                loc: {
                    type: 'Point',
                    coordinates: [req.body.longitude, req.body.latitude]
                }
            });

            newPitstop.save().then(function(model, b) {
                if (!model.errors) {
                    res.json({ success: true, msg: 'Pitstop added' });
                } else {
                    res.json({ success: false, msg: 'Failed to add pitstop' });
                }
            });
        });
});
router.get('/', (req, res, next) => {
    model.find({}, (err, pitstops) => {
        res.json(pitstops);
    });
});
router.get('/:id', (req, res, next) => {
    console.log('id', typeof req.params.id);
    model.findOne({ id: Number(req.params.id) }, (err, pitstop) => {
        // console.log('got this stop yo', pitstop)
        res.json(pitstop);
    });
});

router.post('/radius', (req, res, next) => {
    // model.aggregate(
    //     [
    //         {
    //             $geonear: {
    //                 near: {
    //                     type: 'Point',
    //                     coordinates: [req.body.longitude, req.body.latitude]
    //                 },
    //                 distanceField: 'distance',
    //                 spherical: true,
    //                 maxDistance: req.body.radius * 1609.34
    //             }
    //         }
    //     ],
    //     function(err, data) {
    //         console.log('found these', data);
    //         return res.json(data);
    //     }
    // );
    model.aggregate(
        [
            { "$geoNear": {
                "near": {
                   "type": "Point",
                    "coordinates": [req.body.longitude,req.body.latitude]
                },
                "distanceField": "dist",
                "spherical": true
            }},
            { "$sort": { "dist": 1, "usecount": -1 } }
        ],
        function(err,results) {
            res.json(results)
        }
    )
});
var milesToRadian = function(miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
};
module.exports = router;
