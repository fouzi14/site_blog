const route = require("express").Router()
const {regesterUserCntr, loginUserCntr} = require("../controlers/authControlers")


route.post("/register",regesterUserCntr)
route.post("/login",loginUserCntr)

module.exports = route;