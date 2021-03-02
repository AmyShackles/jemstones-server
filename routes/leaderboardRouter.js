const { Router } = require("express");
const { User } = require("../models/User.js");
const router = new Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};
router.get("/", (req, res) => {
    console.log("/ route");
    User.find()
        .select("-__v -_id -createdAt -updatedAt")
        .sort("-stones")
        .lean()
        .then((leaders) => {
            res.status(200).json({ leaders });
        })
        .catch((err) => sendUserError(500, err.message, res));
});

router.get("/:type", (req, res) => {
    console.log("/:type route");
    const { type } = req.params;
    let sort;
    if (type) {
        if (/amy/.test(type)) {
            sort = "-amystones";
        } else if (/col/.test(type)) {
            sort = "-colestones";
        } else if (/ger/.test(type)) {
            sort = "-gerstones";
        } else if (/har/.test(type)) {
            sort = "-harrystones";
        } else if (/jam/.test(type)) {
            sort = "-jamstones";
        } else if (/jan/.test(type)) {
            sort = "-janstones";
        } else if (/jem/.test(type)) {
            sort = "-jemstones";
        } else if (/jom/.test(type)) {
            sort = "-jomstones";
        } else if (/jum/.test(type)) {
            sort = "-jumstones";
        } else {
            sort = "-stones";
        }
    } else {
        sort = "-stones";
    }
    User.find()
        .select("-__v -_id -createdAt -updatedAt")
        .sort(sort)
        .lean()
        .then((leaders) => {
            res.status(200).json({ leaders });
        })
        .catch((err) => sendUserError(500, err.message, res));
});

module.exports = router;
