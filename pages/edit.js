import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import Web3 from '../ethereum/web3';
import { Router } from '../routes';


const options = [
    { key: 'M', text: 'Masculino', value: 'Masculino' },
    { key: 'F', text: 'Femenino', value: 'Femenino' },
];


class RecordEdit extends Component {

    static async getInitialProps(props = {}) {
        const addr = props.query.address;

        const accounts = await Web3.eth.getAccounts();

        var edit1, edit2;

        try {
            edit1 = await record.methods.UserPersonalInformation(addr).call({ from: accounts[0] });
            edit2 = await record.methods.UserPersonalInformation1(addr).call({ from: accounts[0] });

            return {

                name: edit1[0],
                celphone: edit1[1],
                phone: edit1[2],
                gender: edit1[3],
                dob: edit1[4],
                email: edit1[5],

                houseaddr: edit2[0],
                state: edit2[1],
                cp: edit2[2],

            };
        }
        catch (err) {
            alert("NO TINES PERMISO PARA VER ESTA CUENTA");
            Router.pushRoute('/list');
        }
    }
    state = {
        name: `${this.props.name}`,
        celphone: `${this.props.celphone}`,
        phone: `${this.props.phone}`,
        email: `${this.props.email}`,
        gender: `${this.props.gender}`,
        dob: `${this.props.dob}`,
        houseaddr: `${this.props.houseaddr}`,
        state: `${this.props.state}`,
        cp: `${this.props.cp}`,
        loading: false,
        errorMessage: ''
    };


    handleGender = (e, { value }) => this.setState({ gender: value })

    onSubmit = async event => {

        event.preventDefault();

        const { name, celphone, phone, email, gender, dob, houseaddr, state, cp } = this.state;
        console.log(this.state);

        this.setState({loading: true, errorMessage: ''});

        try {
            const accountsEdit = await Web3.eth.getAccounts();

            await record.methods.editDetails(
                name, celphone, phone, email, gender, dob, houseaddr, state, cp
            ).send({ from: accountsEdit[0] });

            alert("Perfil modificado con exito");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Perfil no modificado");
            Router.pushRoute('/list');
        }

        this.setState({ loading: false, name: '', celphone: '', phone: '', email: '', gender: '', dob: '', houseaddr: '', state: '', cp: '' });
    }

    renderDisplay() {
        return (
            <><Segment padded><h1>Editar Registro</h1></Segment>
                <Segment>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>General Information</h2>
                    <Divider clearing />
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Nombre Completo</label>
                                <Input
                                    type="text"
                                    value={this.state.name}
                                    onChange={event => this.setState({ name: event.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Celular</label>
                                <Input
                                    placeholder='Ej. 44-11-15-12-11'
                                    value={this.state.celphone}
                                    onChange={event => this.setState({ celphone: event.target.value })} />
                            </Form.Field>
                        </Form.Group>
                        <br />
                        <Form.Group widths='equal'>

                            <Form.Field>
                                <label>Teléfono Fijo</label>
                                <Input
                                    placeholder='Ej. 01-44-29-64-10'
                                    value={this.state.phone}
                                    onChange={event => this.setState({ phone: event.target.value })} />
                            </Form.Field>

                            <Form.Field>
                                <label>Correo Electrónico</label>
                                <Input
                                    placeholder='Ej. correo@mail.com'
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>Género</label>
                                <Select
                                    label='Género'
                                    control={Select}
                                    options={options}
                                    value={this.state.gender}
                                    onChange={this.handleGender}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Fecha de Nacimiento</label>
                                <Input
                                    placeholder='Eg. 01/01/1997'
                                    value={this.state.dob}
                                    onChange={event => this.setState({ dob: event.target.value })} />
                            </Form.Field>
                            
                        </Form.Group>
                        <br />
                        <Form.Group widths='equal'>
                            <Form.TextArea
                                label='Dirección'
                                value={this.state.houseaddr}
                                onChange={event => this.setState({ houseaddr: event.target.value })} />
                        </Form.Group>
                        <br />
                        <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Información Adicional</h2>
                        <Divider clearing />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Estado</label>
                                <Input
                                    value={this.state.state}
                                    onChange={event => this.setState({ state: event.target.value })} />
                            </Form.Field>

                            <Form.Field>
                                <label>Código Postal</label>
                                <Input
                                    value={this.state.cp}
                                    onChange={event => this.setState({ cp: event.target.value })} />
                            </Form.Field>
                        </Form.Group>
                        <br />
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button primary loading={this.state.loading}>Editar</Button>
                    </Form>
                </Segment></>
        );
    }

    render() {
        return (
            <Layout>
                <div style={{ fontFamily: 'Helvetica' }}>{this.renderDisplay()}</div>
            </Layout>
        );
    }
}

export default RecordEdit;