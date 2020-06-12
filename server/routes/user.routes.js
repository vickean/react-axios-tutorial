const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const user = require("../models/user-schema");

router.get("/hello", (req, res) => {
  console.log("Says hi!");
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

router.get("/geolocate/:address", (req, res, next) => {
  const address = req.params.address;

  console.log(address);
  return res.json({ address });
  // axios({
  //   "method":"GET",
  //   "url":"https://google-maps-geocoding.p.rapidapi.com/geocode/json",
  //   "headers":{
  //   "content-type":"application/octet-stream",
  //   "x-rapidapi-host":"google-maps-geocoding.p.rapidapi.com",
  //   "x-rapidapi-key":"8811b8e6d7msha5966a34116dcb1p19e602jsnc6fe93f0be18",
  //   "useQueryString":true
  //   },"params":{
  //   "language":"en",
  //   "address":"8%2C Jalan 10%2F10D%2C 46000 Petaling Jaya"
  //   }
  //   })
  //   .then((response)=>{
  //     console.log(response)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //     return next(error)
  //   })
});

module.exports = router;
