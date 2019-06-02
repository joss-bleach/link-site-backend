import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from '../models';
import keys from '../config/keys';

const params = {};
params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
params.secretOrKey = keys.secretOrKey;

export default function(passport) {
  passport.use(
    new JwtStrategy(params, (jwt_payload, done) => {
      db.User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}
