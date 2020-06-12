const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const user = require("../models/user-schema");

router.get("/hello", (req, res) => {
  console.log("Says hi!");
  // console.log(process.env.GEOLOCATION_API_KEY);
  return res.json({ potato: "Says hi!" });
});

router.post("/create", (req, res, next) => {
  user.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.get("/", (req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.get("/edit/:id", (req, res) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.get("/geolocate", (req, res, next) => {
  const address = req.query.address;

  console.log(address);

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.GEOLOCATION_API_KEY}`
    )
    .then((response) => {
      console.log("Success!");
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
});

module.exports = router;
