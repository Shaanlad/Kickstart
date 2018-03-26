import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x42610F8670D8a34B9922e22ae53f58AE6B5C3144'
);

export default instance;
