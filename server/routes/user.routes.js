const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

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

module.exports = router;
