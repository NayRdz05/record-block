import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import Web3 from '../ethereum/web3';
//import web3 from 'web3';
import { Router } from '../routes';

const options = [
    { key: 'M', text: 'Masculino', value: 'Masculino' },
    { key: 'F', text: 'Femenino', value: 'Femenino' },
]

class RegisterUser extends Component {
    state = {
        name: '',
        celphone: '',
        phone: '',
        email: '',
        gender: '',
        dob: '',
        houseaddr: '',
        state: '',
        cp: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    onSubmit = async event => {
        event.preventDefault();

        const { name, celphone, phone, email, gender, dob, houseaddr, state, cp } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await Web3.eth.getAccounts();

            await record.methods.setDetails(
                name, celphone, phone, email, gender, dob, houseaddr, state, cp).send({ from: accounts[0] });

            alert("Cuenta creada con éxito!");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("La cuenta ya existe");
        }

        this.setState({ loading: false, name: '', celphone: '', phone: '', email: '', gender: '', dob: '', houseaddr: '', state: '', cp: '' });
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Crear Nuevo Registro</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '10px', marginBottom: '30px'}}>Información General</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                

                        <Form.Field>
                            <label>Nombre Completo</label>
                            <Input                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Celular</label>
                            <Input
                                placeholder = 'Ej. 44-11-15-12-11'
                                value= {this.state.celphone}
                                onChange= {event => 
                                    this.setState({ celphone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>

                    <Form.Field>
                            <label>Teléfono Fijo</label>
                            <Input
                                placeholder = 'Ej. 01-44-29-64-10'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Correo Electrónico</label>
                            <Input
                                placeholder = 'Ej. correo@mail.com'
                                value= {this.state.email}
                                onChange= {event => 
                                    this.setState({ email: event.target.value })}  
                            />
                        </Form.Field>
                        
                        <Form.Field 
                                label='Género' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>Fecha de Nacimiento</label>
                            <Input 
                                placeholder = 'Ej. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Dirección'
                                value= {this.state.houseaddr}
                                onChange= {event => 
                                    this.setState({ houseaddr: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Información Adicional</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Estado</label>
                            <Input 
                                value= {this.state.state}
                                onChange= {event => 
                                    this.setState({ state: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Código Postal</label>
                            <Input 
                                value= {this.state.cp}
                                onChange= {event => 
                                    this.setState({ cp: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group> 
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Registrar</Button>
                </Form>
                </Segment>      
            </Layout>
        );
    }
}

export default RegisterUser;