const fs = require('fs');
const dotenv = require('dotenv');
const configData = fs.readFileSync('.env');
const buf = Buffer.from(configData);
const config = dotenv.parse(buf);

const jwt = require('jsonwebtoken');

module.exports = {

  requireLogin: (req, res, next) => {
    jwt.verify(req.headers.authorization, config.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'invalid_session' })
      }
      req.user = decoded;
      next();
    });
  },

  requirePermits: function () {

    const permits = [];
    for (let i = 0, l = arguments.length; i < l; i++) {
      if (typeof arguments[i] == 'string') {
        permits.push(arguments[i]);
      }
    }

    return (req, res, next) => {
      jwt.verify(req.headers.authorization, config.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'invalid_session' })
        }
        req.user = decoded;

        for (const permit of permits) {
          if ((req.user.permits || []).indexOf(permit) > -1) {
            return next();
          }
        }
        return res.status(403).json({ message: 'invalid_access' })
      });
    }
  }
}