const {getUsers} = require('../controller/users') ;
const { verifyJWT } = require('../middleware/verifyJWT');
const router = require('express').Router();


router.get('/',verifyJWT,getUsers);

module.exports = router; 