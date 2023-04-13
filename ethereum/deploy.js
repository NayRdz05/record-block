const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim();

const provider = new HDWalletProvider(
    [privateKey],
    'https://goerli.infura.io/v3/5bf19b061a304fd79ab0578590cee549',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Intentando implementar desde la cuenta: ', accounts[0]);

    const result = await new web3.eth.Contract(compiledRecord.abi)
    .deploy({data: compiledRecord.evm.bytecode.object})
    .send( {from:accounts[0], gas:'3000000'});

    console.log('Contrato implementado en: ', result.options.address);
    provider.engine.stop();
};

deploy();