const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const DRecord = require('../ethereum/build/Record.json');

let accounts;
let record;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // const instance = new web3.eth.Contract((Record.abi),
    record = await new web3.eth.Contract((DRecord.abi))
    // REAL record = await new web3.eth.Contract(JSON.parse(DRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
});

// ===========================================================

describe('Records', () => {
    it('Puede implementar un contrato de registro', () => {
        assert.ok(record.options.address);
    });

    it('Puede agregar registro', async () => {
        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[0], gas: '5000000' });
    });

    it('Puede recuperar las direcciones de registro', async () => {
        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[0], gas: '5000000' });

        const allRecords = await record.methods.getUser().call();

        const owner = await record.methods.owner().call();

        assert.equal(allRecords, owner);
    });

    it('Puede buscar a un usuario', async () => {
        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const owner = await record.methods.owner().call();

        names = await record.methods.searchUserPersonalInfo(owner).call();

        assert.equal(names[0], '0x018aA5f5bJpp673E78DEeT0540765c5889626687');
    });

    it('Puede crear un usuario utilizando multiples cuentas', async () => {
        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[1], gas: '5000000' });
        
        const allRecords = await record.methods.getUsers().call();

        assert.equal(allRecords[0], accounts[0]);
        assert.equal(allRecords[1], accounts[1]);
    });

    
    it('Puede contar el número de registros creados por el USUARIO', async () => {
        await record.methods.setDetails(
             'Luis Campos Rodriguez', '44-11-34-54-67', '01-44-29-34-76', 'lucr@gmail.com','Masculino', '02/03/2000', 'Girasol S/N, Los Palacios, Bernal, E.Montes.', 'Queretaro', '763490'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const UserCount = await record.methods.getUserCount().call();
        assert.equal(UserCount, 1);
    });
});