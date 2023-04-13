import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract((Record.abi),
    '0xD0F730526D3C7AD9062558D0Cfc5cDB662947f53'


    // ============================================
    // =    S e g u n d a     v e r s i o n       =
    // ============================================

    //  '0x50d3A9321d385C8B28c6897714CfA8a1CfF95b7c'
      
    //==============================================
    //=    Primera direccion Smart Contract ver1   = 
    //==============================================
    //'0x99584e64352798F43137a49392222014c20521Ea' // Código de contrato implementado // Cada vez que se cambia y compila el código de contrato, es necesario actualizarlo
);

export default instance;

//========================================= Real
// const instance = new web3.eth.Contract(
//    JSON.parse(Record.abi),
//    '0x99584e64352798F43137a49392222014c20521Ea' // Código de contrato implementado // Cada vez que se cambia y compila el código de contrato, es necesario actualizarlo
//);


//=======================================0
// const result = await new web3.eth.Contract(compiledRecord.abi)
//.deploy({data: compiledRecord.evm.bytecode.object})
//.send( {from:accounts[0], gas:'3000000'});   