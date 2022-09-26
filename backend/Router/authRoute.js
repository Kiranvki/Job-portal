const route=require('express').Router();
const authController=require('../Controller/authController')

route.post(`/register`,authController.register)
route.post(`/login`,authController.login)
route.get(`/logout`,authController.logout)
route.get(`/refreshToken`,authController.refreshToken)

module.exports=route
