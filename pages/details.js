import React, { Component } from 'react';
import { Grid, Segment, Header, Image, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import Web3 from '../ethereum/web3';
import { Router } from '../routes';



class RecordDetails extends Component {

    onClickedUserUPDF = async event => {
        event.preventDefault();
        const accounts = await Web3.eth.getAccounts();
        Router.pushRoute(`/pdf/${accounts[0]}`);
    }

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await Web3.eth.getAccounts();
        var records, records2, perfil;

        try {
            records = await record.methods.searchUserPersonalInfo(addr).call({ from: accounts[0] });
            records2 = await record.methods.searchUserAditionalInfo(addr).call({ from: accounts[0] });

            //perfil = (records[3] == 'Masculino') ? 'https://cdn-icons-png.flaticon.com/512/180/180658.png' : 'https://cdn-icons-png.flaticon.com/512/201/201634.png';

            return {

                name: records[0],
                celphone: records[1],
                phone: records[2],
                gender: records[3],
                dob: records[4],
                email: records[5],

                houseaddr: records2[0],
                state: records2[1],
                cp: records2[2],
                perfil

            };
        }
        catch (err) {
            Alert.alert("NO TINES PERMISO PARA VER ESTA CUENTA");
            Router.pushRoute('/list');
        }
    }

    renderDisplay() {

        return (

            <Grid columns={2} stackable className="fill-content">

                <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={5}>
                        <Segment>
                            <Image style={{ marginBottom: '25px' }} className="centered" src={this.props.perfil} size="small" circular />
                            <Segment>
                                <h3 style={{ marginBottom: '25px' }}>{this.props.name}</h3>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column style={{ color: 'grey', fontWeight: 'bold' }}>Celular</Grid.Column>
                                        <Grid.Column style={{ marginBottom: '5px', fontWeight: 'bold' }}>{this.props.celphone}</Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column style={{ color: 'grey', fontWeight: 'bold' }}>Género</Grid.Column>
                                        <Grid.Column style={{ marginBottom: '5px', fontWeight: 'bold' }}>{this.props.gender}</Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Segment>
                        <Segment>
                            <Header as="h3" color='grey' style={{ marginBottom: '25px' }}>DATOS ADICIONALES DE CONTACTO</Header>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column style={{ color: 'grey', fontWeight: 'bold' }}>Teléfono Fijo</Grid.Column>
                                    <Grid.Column style={{ marginBottom: '5px', fontWeight: 'bold' }}>{this.props.phone}</Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column style={{ color: 'grey', fontWeight: 'bold' }}>Email</Grid.Column>
                                    <Grid.Column style={{ fontWeight: 'bold' }}>{this.props.email}</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment>
                            <Header as="h3" color='grey' style={{ marginBottom: '25px' }}>DATOS PERSONALES</Header>
                            <Grid columns={2} verticalAlign='top'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Nombre completo</b>
                                        <div style={{ fontWeight: 'bold' }}>{this.props.name}</div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Fecha de Nacimiento</b>
                                        <div style={{ fontWeight: 'bold' }}>{this.props.dob}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid columns={1}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Dirección</b>
                                        <div style={{ fontWeight: 'bold' }}>{this.props.houseaddr}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Header as="h3" color='grey' style={{ marginTop: '35px', marginBottom: '25px' }}>DATOS ADICIONALES DE DIRECCION</Header>
                            <Grid columns={2} verticalAlign='top'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Estado</b>
                                        <div style={{ fontWeight: 'bold' }}>{this.props.state}</div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Código Postal</b>
                                        <div style={{ fontWeight: 'bold' }}>{this.props.cp}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        <Segment>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column style={{ color: 'grey', fontWeight: 'bold', marginTop: '20px' }}>Obtener registro en PDF:</Grid.Column>
                                    <Button
                                        route='/pdf' style={{ fontSize: 15, color: '#1122E6', fontWeight: 'bold',  marginTop: '5px' }}
                                        onClick={this.onClickedUserUPDF}>Ver/Descargar PDF</Button>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid.Row>
            </Grid >
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

export default RecordDetails;