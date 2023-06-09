import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import Web3 from '../ethereum/web3';
import dynamic from "next/dynamic";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile }) => (
  <Container text>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
    <Header
      as='h1'
      content='Sistema de Registro de Usuario en Blockchain'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        fontFamily: 'Georgia',
      }}
    />
    <Header
      as='h2'
      content='Asegúrese de que sus registros estén sanos y salvos'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  onClickedUserEdit = async event => {
    event.preventDefault();
    const accounts = await Web3.eth.getAccounts();
    Router.pushRoute(`/edit/${accounts[0]}`);
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu size='large' inverted>

            <Link route='/' className='item'>Home</Link>
              <Menu.Menu position='right'>

              <Link route='/list' className='item'>Lista de Registros</Link>
                <Dropdown item text='Usuario'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                    <Link route='/edit' style={{ color: 'black' }} onClick={this.onClickedUserEdit}>Editar Perfil</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Register'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                    <Link route='/register-user' style={{ color: 'black' }}>Usuario</Link>
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>

              </Menu.Menu>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })

  onClickedUserEdit = async event => {
    event.preventDefault();
    const accounts = await Web3.eth.getAccounts();
    Router.pushRoute(`/edit/${accounts[0]}`);
  }


  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link route='/' className='item'>Home</Link>
            
            <Link route='/list' className='item'>Lista de Registros</Link>

            <Dropdown item text='Usuario'>
              <Dropdown.Menu>
                <Dropdown.Item>

                  <Link route='/edit' style={{ color: 'black' }} onClick={this.onClickedUserEdit}>Editar Perfil</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text='Registrar'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link href='/register-user' style={{ color: 'black' }}>Usuario</Link>                  
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Ayudamos a las empresas.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Podemos darle a su empresa el poder para hacer cosas que nunca creyeron posibles.
              Permita deleitar a sus clientes y potenciar sus necesidades a través de Sistemas
              confiables de registros sobre Blockchain.</p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Sistemas de Registro sobre Blockchain
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Sí, así es, sistemas de registros diseñados y fáciles de usar.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='https://enzyme.biz/hubfs/iStock-1061234002.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Búsquenos</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Fácil de usar, Confiable, Seguro"
            </Header>
            <p style={{ fontSize: '1.33em' }}>La seguridad y la privacidad de Blockchain más allá de la Tecnología
              y de las Criptomonedas.
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Uno de los mejores sistemas de Registro en Blockchain."
            </Header>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Beneficio esperado con el de Blockchain.
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          La información del historial del registro de un usuario está contenido en una cadena blockchain en la cual se puede aportar
          información adicional, que estará disponible en cualquier momento y en cualquier lugar.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Casos de estudio</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          ¿Es Blockchain el mejor paso adelante para los sistemas de registros?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          La tecnología Blockchain tiene el potencial de permitir una gestión de datos más segura, transparente y equitativa.
          Además de administrar datos de manera segura, blockchain tiene ventajas significativas en la distribución de acceso,
          control y propiedad de datos a los usuarios finales.
        </p>
        <Button as='a' size='large'>
          Ver Investigación
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Desarrollo' />
              <List link inverted>
                <List.Item as='a'>COBOL</List.Item>
                <List.Item as='a'>React Native</List.Item>
                <List.Item as='a'>PHP</List.Item>
                <List.Item as='a'>API</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Servicios Blockchain' />
              <List link inverted>
                <List.Item as='a'>Sistemas Blockchain</List.Item>
                <List.Item as='a'>Solidity</List.Item>
                <List.Item as='a'>Criptomonedas</List.Item>
                <List.Item as='a'>NFT</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Insiscomp
              </Header>
              <p>
                Accede a los cursos de tecnología más novedosos y destacados del mercado.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default dynamic(() => Promise.resolve(HomepageLayout), {ssr: false})
