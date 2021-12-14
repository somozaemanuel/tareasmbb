import { useState } from "react";
import { Form, Button, Row, Container, Col, Alert, Nav } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import store from "../../store/store";
import { ProfileResponse } from "../../types/types";
import { useNavigate } from "react-router-dom";
import authSlice from "../../store/slices";
import FETCH_URL from "../../utils/fetchurl";

function Login(): JSX.Element {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showBadLogin, setShowBadLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        let formData: FormData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const res: any = await axios.post(FETCH_URL + "login/", formData).catch(err => {
            setShowBadLogin(true);
        });

        if (res != undefined) {
            let profile: ProfileResponse = {
                id: res.data.profile.id,
                name: res.data.profile.name,
                surname: res.data.profile.surname,
                user: res.data.profile.user
            };

            store.dispatch(
                authSlice.actions.saveUserData({
                    token: res.data.access,
                    refreshToken: res.data.refresh,
                    profile: profile,
                    staff: res.data.staff,
                })
            );

            navigate("/profile");
        }
    };

    return (
        <>
            <Container fluid id="bg">
                <Container fluid id="contenedor">
                    <Row className="justify-content-md-center">
                        <Col xs={11}>
                            <h1>Iniciar sesión</h1>
                            <Form id="signin-form">
                                <Form.Group className="mb-3">
                                    <Form.Label>Legajo</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese legajo" name="username" onChange={e => setUsername(e.target.value)} />
                                    <Form.Text className="text-muted">No compartas nunca tu usuario con alguien.</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" name="password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Nav style={{ display: "inline", float: "right", margin: "auto", padding: "0" }}>
                                        <Nav.Item style={{ display: "inline", float: "right", margin: "auto", padding: "0" }}>
                                            <Nav.Link href="/register" style={{ display: "inline", float: "right", margin: "auto", padding: "0" }}>
                                                Registrarse
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Form.Group>

                                <Button variant="primary" type="button" id="login-button" onClick={handleLogin} disabled={username == "" || password == ""} style={{float: "left"}}>
                                    Ingresar
                                </Button>
                            </Form>
                            <Alert variant="danger" onClose={() => setShowBadLogin(false)} dismissible hidden={!showBadLogin} id="bad-login-alert" style={{marginTop: "5em"}}>
                                <p>Usuario y/o contraseña incorrectos.</p>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Login;
