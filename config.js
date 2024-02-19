const dotenv = require('dotenv');

// load .env file
dotenv.config({ path: __dirname + './env' });

const config = {
  rpcURL: process.env.RPC_URL || '',
  accountAddress: process.env.ACCOUNT_ADDRESS || '',
  accountPrivateKey: process.env.ACCOUNT_PK || '',
  tokenAddress: process.env.TOKEN_ADDRESS || '',
};

module.exports = { config };
