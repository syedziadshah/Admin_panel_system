const express= require("express");
const services = require("../controller/servicescontroller");
const { model } = require("mongoose");
const router =express.Router();

 router.route("/service").get(services);

module.exports =router