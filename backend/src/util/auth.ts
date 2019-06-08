import passport from 'passport';
import passportJWT from 'passport-jwt';
import { verifyUserById } from '../components/user/service';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};
const strategy = new JwtStrategy(options, (payload: any, done: any) => {
    const userExists = verifyUserById(payload.id)
        .catch((err: Error) => done(err, false));
    done(null, userExists);
});
passport.use(strategy);
export const auth = passport.initialize();