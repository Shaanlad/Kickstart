import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser
  web3 = new Web3(window.web3.currentProvider);

} else {
  // We are on the server OR user isn't running Metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/vdRAxxN7W1DN5TazexON'
  );
  web3 = new Web3(provider);
}
export default web3;
