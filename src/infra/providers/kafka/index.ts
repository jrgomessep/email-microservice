import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
    brokers: String(process.env.KAFKA_BROKER).split(','),
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USER as string,
        password: process.env.KAFKA_PASS as string
    },
    logLevel: logLevel.ERROR,
});

export { kafka };