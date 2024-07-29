import 'dotenv/config';
import * as Sentry from "@sentry/node"

import { nodeProfilingIntegration } from "@sentry/profiling-node"

import http from 'http';

import server from './server';

const { PORT } = process.env;

Sentry.init({
    dsn: "https://483b47dd6747af012c94439eb0346019@o4507402550181888.ingest.de.sentry.io/4507402604249168",
    integrations: [
        nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});

http.createServer({
}, server)
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
