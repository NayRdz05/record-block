import React, { Component, useState, useEffect } from 'react';
import { Card, Input, Form } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import Web3 from '../ethereum/web3';
import { Router } from '../routes';


        // const [users, setUsers] = useState([])
//  const [search, setSearch ] = useState("")

//  const searcher = (e) => {
//     setSearch(e.target.value)
//     console.log(e)
// }

class RecordsList extends Component {
    state = { 
        search: '' 
    };
    
    static async getInitialProps() {
        // Accede a la funion de smart Contract de List para obtener el listado de todas as direcciones
        const allRecords = await record.methods.getUser().call();
        //console.log(allRecords)
        //Retorna todas las direcciones registradas
        return { allRecords };
        // ======================================
        // const [users, setUsers] = useState([])
        // const [search, setSearch ] = useState("")
        // ======================================
    }

    renderRecords() {

        const items = this.props.allRecords.map(address => {
            return {
                header: address,
                description: (
                    
                    <Link route={`/record/${address}`}>
                        <a style={{ fontSize: 15, color: '#1122E6', fontWeight:'bold' }}>Ver Perfil Del Usuario</a>
                    </Link>
                ),
                fluid: true
            };
        });
        // console.log('items', items)
        // console.log('nay')
        
        //Agregar todos los registros al grupo de tarjetas
        return <Card.Group items={items} />;
    }

    onSearch = async event => {
    const [users, setUsers] = useState([])
    const [search, setSearch ] = useState("")
   
    const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e)
}
         event.preventDefault(); //prevent browser from submitting form to back end server
        // Router.pushRoute('/details');
    };
  


    render() {
        return (
            <Layout>
                <div>
                <Form onSubmit={this.onSearch}> 
                        <Form.Field>
                            <Input 
                                fluid 
                                action={{ icon: 'search' }} 
                                placeholder='Search...' 
                                onChange={(event) => this.setState({ search: event.target.value })}
                            /><br/>
                        </Form.Field>
                    </Form>
                     <h2>Lista de Usuarios Registrados</h2>
                    {this.renderRecords()}
                </div>
            </Layout>
        );
    }
}

export default RecordsList;