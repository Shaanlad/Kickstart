import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3f5930844DbD96A0BBbb47a19c384488489bfD3D'
);

export default instance;
