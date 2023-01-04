const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');


function hashPassword(password: any) {
    let hashed = bcrypt.hashSync(password, config.saltRounds);
    return hashed;
  }
  
  function createToken(user: any){
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    return jwt.sign(payload,config.jwt.secret,config.jwt.options);
  }
  
  export{hashPassword,createToken }