/* eslint-disable import/no-mutable-exports */
import {Connection, ConnectionOptions, createConnection} from 'typeorm';

import {ActiveSession} from '../models/ActiveSession';
import {User} from '../models/User';
import {Ticket} from '../models/Ticket';
import {Role} from '../models/Role';
import {Setting} from '../models/Setting';
import {Choice} from '../models/Choice';
import {Question} from '../models/Question';
import {Questionnaire} from '../models/Questionnaire';
import {QuestionnaireQuestion} from '../models/QuestionnaireQuestion';
import {QuestionnaireType} from '../models/QuestionnaireType';
import {QuestionType} from '../models/QuestionType';
import {UserQuestion} from '../models/UserQuestion';
import {UserQuestionnaire} from '../models/UserQuestionnaire';

// Ensure necessary environment variables are set for PostgreSQL connection
if (
    !process.env.POSTGRES_HOST
    || !process.env.POSTGRES_PORT
    || !process.env.POSTGRES_USER
    || !process.env.POSTGRES_PASSWORD
    || !process.env.POSTGRES_DB) {
    throw new Error('One or more required environment variables (POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) are not set.');
}

const options: ConnectionOptions = {
    type: 'postgres', // Change to 'postgres'
    host: process.env.POSTGRES_HOST, // PostgreSQL server host
    port: parseInt(process.env.POSTGRES_PORT, 10), // PostgreSQL server port
    username: process.env.POSTGRES_USER, // PostgreSQL username
    password: process.env.POSTGRES_PASSWORD, // PostgreSQL password
    database: process.env.POSTGRES_DB, // PostgreSQL database name
    entities: [
        User,
        ActiveSession,
        Role,
        Ticket,
        Setting,
        Choice,
        Question,
        Questionnaire,
        QuestionnaireQuestion,
        QuestionnaireType,
        QuestionType,
        UserQuestion,
        UserQuestionnaire,
    ],
    synchronize: true, // Be cautious with this in production
    logging: false,
};

export let connection: Connection | undefined;

export const connect = async (): Promise<Connection | undefined> => {
    try {
        const conn = await createConnection(options);
        connection = conn;
        console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
        return conn; // Return the connection instead of undefined
    } catch (err) {
        console.error('Database connection error:', err);
        return undefined;
    }
};
