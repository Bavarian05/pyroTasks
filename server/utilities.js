var jwt = require('jwt-simple');

exports.createToken = function(request, response, user_id){
  var payload = {'user_id': user_id};
  var secret = require('./config.js').jwtsecret;
  var token = jwt.encode(payload, secret);
  response.set('token', token).status(201).json({token: token});
};

exports.checkToken = function(request, response, next){
  var secret = require('./config.js').jwtsecret;
  if(!request.headers['x-access-token']){
    response.sendStatus(401);
  } else {
    var decodedToken = jwt.decode(request.headers['x-access-token'], secret);
    request.user = {};
    request.user.id = decodedToken.user_id;
    next();
  }
};
