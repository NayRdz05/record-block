const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
console.log('Eliminando la carpeta de compilacion...');
fs.removeSync(buildPath);

console.log('Obteniendo el contrato por ruta...')
const RecordPath = path.resolve(__dirname, 'contracts', 'Record.sol');
const source = fs.readFileSync(RecordPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Record.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

for(contractName in output.contracts['Record.sol']){
    fs.outputJSONSync(
        path.resolve(buildPath, contractName + '.json'),
        output.contracts['Record.sol'][contractName]
    );
    
console.log('Compilacion de contrato ok');

}
