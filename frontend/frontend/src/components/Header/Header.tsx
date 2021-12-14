import { FC, useEffect, useState } from "react"
import store from "../../store/store";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header: FC = (): JSX.Element => {

    const [userLogged, setUserLogged] = useState(false);
    const [username, setUsername] = useState("");

    const storeLoad = () => {
      setUserLogged(store.getState().auth.profile !== null);
      setUsername(store.getState().auth.profile?.name!)
    }

    store.subscribe(storeLoad);

    return <>
    <Navbar bg="dark" variant="dark">
        <Container fluid> 
          {userLogged ? <Navbar.Brand hidden={!userLogged}>Bienvenido/a, {username}</Navbar.Brand> : ""}
          <Nav className="justify-content-end" id="header">
            <Nav.Link href="/login" hidden={userLogged}>Login</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/profile" hidden={!userLogged}>Perfil</Nav.Link>
            </Nav.Item> 
            <Nav.Item>
              <Nav.Link href="/mytasks" hidden={!userLogged || store.getState().auth.staff! }>Mis tareas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/logout" hidden={!userLogged}>Cerrar sesión</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/teamtasks" hidden={!userLogged || !store.getState().auth.staff! }>Tareas equipo</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>;
}

export default Header;