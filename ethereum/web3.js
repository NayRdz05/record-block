import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.web3 !== 'undefined') {
    // En el navegador Y metamask se está ejecutando
    async () => {await window.web3.currentProvider.enable();}
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Estamos en el servidor O el usuario no está ejecutando metamask
    const provider = new Web3.providers.HttpProvider(
        'https://goerli.infura.io/v3/5bf19b061a304fd79ab0578590cee549'
    );
    web3 = new Web3(provider);
}

export default web3;