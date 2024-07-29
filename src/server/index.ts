import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import {rateLimit} from 'express-rate-limit'
// import { checkToken } from '../config/safeRoutes';

import initPassport from '../config/passport';
import {
    authRouter,
    // ticketRouter,
    // settingRouter,
} from '../routes/admin/_old';

import adminRouter from '../routes/admin';

import {
    publicTicketRouter,
} from '../routes/public';


import {connect} from './database';

// Instantiate rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 3, // Limit each IP to  requests per `window` (here, per 1 minute).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
    connect().then(_r => {
        server.use(cors());
        server.use(express.json());

        // Initialize admin routes middleware
        server.use('/v1/admin/auth', limiter, authRouter);
        server.use('/v1', limiter, adminRouter);
        // server.use('/v1/admin', checkToken, ticketRouter);
        // server.use('/v1/admin', checkToken, settingRouter);

        // Initialize public routes middleware
        server.use('/v1/public', publicTicketRouter);
    });
}


export default server;
