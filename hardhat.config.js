require("@nomiclabs/hardhat-waffle");
const secrets = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten: {
      url: "https://ropsten.infura.io/v3/32f8ddb78a434579a05e2a99dcbf0770", // ez: should create ur own for ur own project
      accounts: ['8df54a447dc444abbd82506bc6b8fb082f56629896efe0bb0c651a614b853423'], // LOL DON"T POST THIS
    },
  },
};

require("@nomiclabs/hardhat-waffle");
