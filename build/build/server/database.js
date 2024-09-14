"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.connection = void 0;
/* eslint-disable import/no-mutable-exports */
const typeorm_1 = require("typeorm");
const ActiveSession_1 = require("../models/ActiveSession");
const User_1 = require("../models/User");
const Ticket_1 = require("../models/Ticket");
const Role_1 = require("../models/Role");
const Setting_1 = require("../models/Setting");
// Ensure necessary environment variables are set for PostgreSQL connection
if (!process.env.POSTGRES_HOST
    || !process.env.POSTGRES_PORT
    || !process.env.POSTGRES_USER
    || !process.env.POSTGRES_PASSWORD
    || !process.env.POSTGRES_DB) {
    throw new Error('One or more required environment variables (POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) are not set.');
}
const options = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [
        User_1.User,
        ActiveSession_1.ActiveSession,
        Role_1.Role,
        Ticket_1.Ticket,
        Setting_1.Setting,
    ],
    synchronize: true,
    logging: false,
};
const connect = async () => {
    try {
        const conn = await (0, typeorm_1.createConnection)(options);
        exports.connection = conn;
        console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
        return conn; // Return the connection instead of undefined
    }
    catch (err) {
        console.error('Database connection error:', err);
        return undefined;
    }
};
exports.connect = connect;
//# sourceMappingURL=database.js.map