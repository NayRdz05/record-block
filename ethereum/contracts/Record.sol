// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4; 

contract Record {

        struct Users{
        string  name;
        // Numero celular
        string  celphone;
        // Numero fijo
        string  phone;
        // Correo
        string  email;
        // Genero
        string  gender;
        // Fecha de nacimiento
        string  dob;
        // Direccion
        string  houseaddr;
        // Estado
        string state;
        // CP
        string cp;
        // Direccion-contr
        address addr;
        // Fecha
        uint    date;
    }

    address public owner;
    address[] public userList;

    
    // mapping(address => user) public users
    mapping(address => Users) public users;

    mapping(address => bool) isUser;

    uint256 public userCount = 0;

    constructor () {
        owner = msg.sender;
    } 

    // Recupera los datos del usuario (de la página de registro del usuario) y almacena la cadena de bloques.
    // Retrieve user details from user sign up page and store the details into the blockchain.
    function setDetails(string memory _name, 
                        string memory _celphone,
                        string memory _phone,
                        string memory _email,
                        string memory _gender,
                        string memory _dob,
                        string memory _houseaddr,
                        string memory _state,
                        string memory _cp) public {
        require(!isUser[msg.sender]);
        users[msg.sender]= Users(
              _name,
              _celphone,
              _phone,
              _email,
              _gender,
              _dob,
              _houseaddr,
              _state,
              _cp,
              msg.sender,
              block.timestamp
       );
        
        userList.push(msg.sender);
        isUser[msg.sender] = true;
        //isApproved[msg.sender][msg.sender] = true;
        userCount++;
    }
    // Permite al usuario editar su registro existente.
    // Allows user to edit their existing record.
        function editDetails(string memory _name, 
                             string memory _celphone,
                             string memory _phone,
                             string memory _email,
                             string memory _gender,
                             string memory _dob,
                             string memory _houseaddr,
                             string memory _state,
                             string memory _cp) public {
        require(isUser[msg.sender]);
        users[msg.sender]= Users(
           _name,
           _celphone,
           _phone,
           _email,
           _gender,
           _dob,
           _houseaddr,
           _state,
           _cp,
            msg.sender,
            block.timestamp
       );   
    }  

    // Recuperar una lista de todas las direcciones de los usuarios.
    // Retrieve a list of all users address.
    function getUser() public view returns(address [] memory) {
        return userList;
    } 

    // Busca la fecha de creación del registro del usuario ingresando la dirección del usuario.
    // Search user record creation date by entering a user address.
    function searchRecordDate(address _address) public view returns(uint) {
        users[_address];
        return (users[_address].date);
    }

    // Recuperar conteo de usuarios.
    // Retrieve usuarios count.
    function getUserCount() public view returns(uint256) {
        return userCount;
    }

    // Busca los detalles de la informacion personal del usuario ingresando la dirección (Usuario), (solo se permitira el acceso al propietario del registro)
    // Search user personal information details by entering a user address (only the owner of the record will be allowed access).
    function searchUserPersonalInfo(address _address) public view returns (string memory,
                                                                           string memory,
                                                                           string memory,
                                                                           string memory,
                                                                           string memory,
                                                                           string memory) {

                                                                                require(isUser[msg.sender]);
                                                                                return ( users[_address].name, 
                                                                                         users[_address].celphone,
                                                                                         users[_address].phone,
                                                                                         users[_address].gender,
                                                                                         users[_address].dob,
                                                                                         users[_address].email);
                                                                             }

    // Buscar detalles de información adicional del usuario ingresando una dirección de usuario (solo se permitirá el acceso al propietario del registro)
    // Search user aditional Information details by entering a user address (Only record owner  will be allowed to access)
    function searchUserAditionalInfo(address _address) public view returns(string memory, 
                                                                           string memory,
                                                                           string memory) {
                                                                                require(isUser[msg.sender]);
                                                                                return (users[_address].houseaddr,
                                                                                        users[_address].state,
                                                                                        users[_address].cp);
                                                                           }

    // Busca los detalles de la informacion del usuario ingresando la dirección (Usuario), (solo se permitira el acceso al propietario del registro)
    // Search user personal information details by entering a user address (only the owner of the record will be allowed access).
    function UserPersonalInformation(address _address) public view returns (string memory,
                                                                            string memory,
                                                                            string memory,
                                                                            string memory,
                                                                            string memory,
                                                                            string memory) {
                                                                                require(isUser[msg.sender]);
                                                                                return ( users[_address].name, 
                                                                                         users[_address].celphone,
                                                                                         users[_address].phone,
                                                                                         users[_address].gender,
                                                                                         users[_address].dob,
                                                                                         users[_address].email);
                                                                             }   

    function UserPersonalInformation1(address _address) public view returns(string memory, 
                                                                            string memory,
                                                                            string memory) {
                                                                                require(isUser[msg.sender]);
                                                                                return (users[_address].houseaddr,
                                                                                        users[_address].state,
                                                                                        users[_address].cp);
                                                                           }                                                                      

}