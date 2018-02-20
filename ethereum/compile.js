const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete build folder
// read Campaign.sol from contracts folder
// compile both contracts with solidity compiler
// write output to build folder

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');
const output = solc.compile(source, 1).contracts;

// check if folder is present, if not, create
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    // windows does not allow to name files starting with ':', hence replaced ':'
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
