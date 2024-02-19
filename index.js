const { RpcProvider, Account, CallData, cairo } = require("starknet");
const { config } = require('./config');

const provider = new RpcProvider({
  nodeUrl: config.rpcURL
});

const account = new Account(provider, config.accountAddress, config.accountPrivateKey);

const transfer_fund = async (to, amount) => {
  let normalized_amount = amount * 10 ** 18;

  const result = await account.execute(
    {
      contractAddress: config.tokenAddress,
      entrypoint: 'transfer',
      calldata: CallData.compile({
        recipient: to,
        amount: cairo.uint256(normalized_amount)
      })
    }
  );
  console.log("Tx hash: ", result.transaction_hash);
  await provider.waitForTransaction(result.transaction_hash);
  console.log("Tx successful!");
}

(async () => {
  if (process.argv.length !== 4) {
    Logger.error(`Error: Please provide the recepient address and the amount`);
    process.exit(1);
  }

  const to = process.argv[2];
  const amount = parseFloat(process.argv[3]);

  await transfer_fund(to, amount);
})();