import Redis from 'ioredis';

// ─── Connection Config ────────────────────────────────────────────────────────

const redisHost = 'redis-11744.c261.us-east-1-4.ec2.cloud.redislabs.com';
const redisPort = 11744;
const redisUsername = 'default';
const redisPassword = 'GbI2RyjtPWOQ0Aq5ZR8hvO8ltt1KdqIR';

export const redisConnection = {
  host: redisHost,
  port: redisPort,
  username: redisUsername,
  password: redisPassword,
};

// ─── IORedis Client ───────────────────────────────────────────────────────────

const client = new Redis({
  ...redisConnection,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

client.on('connect', () => console.log('Redis client connected'));
client.on('error', (err) => console.error('Redis Client Error', err));

export default client;


