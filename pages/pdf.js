import React, { Component } from 'react';
import Router from 'next/router'
import record from '../ethereum/record';
import Web3 from '../ethereum/web3';
//import { Router } from '../routes';
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";


class RecordPDF extends Component {

    static async getInitialProps(props) {

        const addr = props.query.address;

        const accounts = await Web3.eth.getAccounts();

        var pdf1, pdf2;


        try {
            pdf1 = await record.methods.searchUserPersonalInfo(addr).call({ from: accounts[0] });
            pdf2 = await record.methods.searchUserAditionalInfo(addr).call({ from: accounts[0] });

            return {
                name: pdf1[0],
                celphone: pdf1[1],
                phone: pdf1[2],
                gender: pdf1[3],
                dob: pdf1[4],
                email: pdf1[5],

                houseaddr: pdf2[0],
                state: pdf2[1],
                cp: pdf2[2],

            };

        }
        catch (err) {
            //alert("NO TINES PERMISO PARA VER ESTA CUENTA");
            //alert("NO TINES PERMISO PARA VER ESTA CUENTA");
            console.log(err)
            Router.push('/list');
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

    render() {

        const { name, celphone, phone, email, gender, dob, houseaddr, state, cp } = this.state
        console.log('DATOSSS', this.state);
        localStorage.setItem('state1', JSON.stringify({ name, celphone, phone, email, gender, dob, houseaddr, state, cp }));
        const state1 = JSON.parse(localStorage.getItem('state1'));

        return (

            <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <Document>
                    <Page style={styles.body}>

                        <Image
                            style={styles.pageBackground}
                            src="data:image/jpeg;base64,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"
                        />

                        <View style={styles.contenedorHoja}>
                            <View style={styles.contEncabezado}>
                                <Text style={styles.textEncabezado}>Registro de Usuario en Blockchain</Text>
                                <Text style={styles.header}>~ INSISCOMP ~</Text>
                            </View >

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ top: 15, flex: 1, height: 1, backgroundColor: 'grey' }} />
                                <View>
                                    <Text style={styles.textRecuadro}>    DATOS PERSONALES    </Text>
                                </View>
                                <View style={{ top: 15, flex: 1, height: 1, backgroundColor: 'grey' }} />
                            </View>

                            <View style={styles.contGroup1}>
                                <Text style={styles.textEtiqueta}>Nombre(s) y apellidos:</Text>
                                <Text style={styles.textDato}> {name} </Text>
                            </View>

                            <View style={styles.contGroup1}>
                                <Text style={styles.textEtiqueta}>Género:</Text>
                                <Text style={styles.textDato}> {gender} </Text>
                            </View>

                            <View style={styles.contGroup1}>
                                <Text style={styles.textEtiqueta}>Fecha de Nacimiento:</Text>
                                <Text style={styles.textDato}>{dob}</Text>
                            </View>

                            <View style={styles.contGroup1}>
                                <Text style={styles.textEtiqueta}>Celular:</Text>
                                <Text style={styles.textDato}>{phone}</Text>
                            </View>

                            <View style={styles.contGroup1}>
                                <Text style={styles.textEtiqueta}>Dirección:</Text>
                                <Text style={styles.textDato}>{houseaddr}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ top: 35, flex: 1, height: 1, backgroundColor: 'grey' }} />
                                <View>
                                    <Text style={styles.textRecuadroCont}>    DATOS ADICIONALES DE CONTACTO    </Text>
                                </View>
                                <View style={{ top: 35, flex: 1, height: 1, backgroundColor: 'grey' }} />
                            </View>

                            <View style={styles.contGroup2}>
                                <Text style={styles.textEtiqueta}>Teléfono fijo:</Text>
                                <Text style={styles.textDato}>{celphone}</Text>
                            </View>

                            <View style={styles.contGroup2}>
                                <Text style={styles.textEtiqueta}>Correo Electrónico:</Text>
                                <Text style={styles.textDato}>{email}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ top: 60, flex: 1, height: 1, backgroundColor: 'grey' }} />
                                <View>
                                    <Text style={styles.textRecuadroAdic}>    DATOS ADICIONALES DE UBICACION    </Text>
                                </View>
                                <View style={{ top: 60, flex: 1, height: 1, backgroundColor: 'grey' }} />
                            </View>

                            <View style={styles.contGroup3}>
                                <Text style={styles.textEtiqueta}>Estado:</Text>
                                <Text style={styles.textDato}>{state}</Text>
                            </View>

                            <View style={styles.contGroup3}>
                                <Text style={styles.textEtiqueta}>Código Postal:</Text>
                                <Text style={styles.textDato}>{cp}</Text>
                            </View>
                        </View>
                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                            `${pageNumber} / ${totalPages}`
                        )} fixed />

                    </Page>
                </Document>
            </PDFViewer>
        );
    }
}

export default RecordPDF;

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    contenedorHoja: {
        flex: 1,
    },

    pageBackground: {
        top: 45,
        position: 'absolute',
        height: '50%',
        width: '80%',
        marginVertical: 160,
        marginHorizontal: 100,
        opacity: 0.2,
    },

    header: {
        fontSize: 11,
        color: 'grey',
        right: 250,
        marginVertical: 50,
    },

    body: {
        paddingTop: 15,
        paddingBottom: 60,
        paddingHorizontal: 30,
    },

    contEncabezado: {
        flex: 0.22,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: "center",
        textAlign: 'center',
    },

    textEncabezado: {
        top: 25,
        fontSize: 20,
        color: '#2E2EFE',
        justifyContent: "center",
        marginVertical: 2,
        marginHorizontal: 110,
    },

    image: {
        top: 10,
        width: 75,
        height: 75,
    },

    contGroup1: {
        top: 25,
        flexDirection: 'row',
        left: 50,
        margin: 10,
    },

    contGroup2: {
        top: 45,
        flexDirection: 'row',
        left: 50,
        margin: 10,
    },

    contGroup3: {
        top: 65,
        flexDirection: 'row',
        left: 50,
        margin: 10,
    },

    textRecuadro: {
        top: 15,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },

    textRecuadroCont: {
        top: 35,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },

    textRecuadroAdic: {
        top: 60,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },

    textEtiqueta: {
        fontSize: 13,
        color: '#000',
        fontWeight: '900',
        fontFamily: 'Oswald',
    },

    textDato: {
        top: 5,
        fontSize: 12,
        color: '#000',
        left: 8,
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },

});