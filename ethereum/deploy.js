const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const compiledFactory =  require('./build/CampaignFactory.json');
const provider = new HDWalletProvider (
  'chair absurd capital trust wear depth tape nature ecology april enroll undo',
  'https://rinkeby.infura.io/vdRAxxN7W1DN5TazexON'
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(
                  JSON.parse(compiledFactory.interface))
                  .deploy({ data: compiledFactory.bytecode })
                  .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();
