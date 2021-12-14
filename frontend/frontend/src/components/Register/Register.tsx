import { FC, useState, useMemo } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "../Login/Login.css";
import "./Register.css";
import debounce from "lodash.debounce";
import axios, { AxiosResponse } from "axios";
import FETCH_URL from "../../utils/fetchurl";

const RegisterComponent: FC = (): JSX.Element => {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [terms, setTerms] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    /*Estados para el control de los íconos*/
    const [iconUser, setIconUser] = useState(0);
    const [iconEmail, setIconEmail] = useState(0);

    /* CSS */
    const [usrColor, setUsrColor] = useState("");
    const [usrMsg, setUsrMsg] = useState("Usuario disponible");
    const [emlColor, setEmlColor] = useState("");
    const [emlMsg, setEmlMsg] = useState("Email disponible");
    const [pswColor, setPswColor] = useState("");
    const [pswMsg, setPswMsg] = useState("");
    const [inputPassword1, setInputPassword1] = useState("red"); /*Entre 4 y 12 caractéres*/
    const [inputPassword2, setInputPassword2] = useState("red"); /*Una mayúscula*/
    const [inputPassword3, setInputPassword3] = useState("red"); /*Una minúscula*/

    const validateUser = async (e: any) => {
        setUsername(e.target.value);
        setIconUser(1);
        let formData: FormData = new FormData();
        formData.append("username", e.target.value);
        let url: string = FETCH_URL + "registeredusers/?username=" + e.target.value;
        let res: AxiosResponse = await axios.get(url);
        if (res.data.length === 0) {
            setUsrColor("green");
            setUsrMsg("¡Usuario disponible!");
            setIconUser(2);
        } else {
            setUsrColor("red");
            setUsrMsg("Usuario no disponible.");
            setIconUser(3);
        }
    };

    const validateEmail = async (e: any) => {
        setEmail(e.target.value);
        setIconEmail(1);
        let formData: FormData = new FormData();
        formData.append("email", e.target.value);
        let url: string = FETCH_URL + "registeredemails/?email=" + e.target.value;
        let res: AxiosResponse = await axios.get(url);
        if (res.data.length === 0) {
            setEmlColor("green");
            setEmlMsg("¡Email disponible!");
            setIconEmail(2);
        } else {
            setEmlColor("red");
            setEmlMsg("Email no disponible.");
            setIconEmail(3);
        }
    };

    const debounceValidateUser = useMemo(() => debounce(validateUser, 1000), []);
    const debounceValidateEmail = useMemo(() => debounce(validateEmail, 1000), []);

    const handleUser = (e: any) => {
        setUsrColor("");
        setIconUser(0);
        if (e.target.value != "") debounceValidateUser(e);
    };

    const handleEmail = (e: any) => {
        setEmlColor("");
        setIconEmail(0);
        if (e.target.value != "") debounceValidateEmail(e);
    };

    const handlePassword1 = (e: any) => {
        setPassword1(e.target.value);
        e.target.value.length >= 8 ? setInputPassword1("green") : setInputPassword1("red");
        e.target.value.toLowerCase() !== e.target.value ? setInputPassword2("green") : setInputPassword2("red");
        e.target.value.toUpperCase() !== e.target.value ? setInputPassword3("green") : setInputPassword3("red");
        if (e.target.value.length >= 4 && e.target.value.toLowerCase() !== e.target.value && e.target.value.toUpperCase() !== e.target.value && e.target.value === password2) {
            setPswColor("green");
            setPswMsg("Las contraseñas coinciden.");
        } else {
            setPswColor("red");
            setPswMsg("Las contraseñas no coinciden o no se respeta el formato.");
        }
    };

    const handlePassword2 = (e: any) => {
        setPassword2(e.target.value);
        if (inputPassword1 === "green" && inputPassword2 === "green" && inputPassword3 === "green" && password1 === e.target.value) {
            setPswColor("green");
            setPswMsg("Las contraseñas coinciden.");
        } else {
            setPswColor("red");
            setPswMsg("Error.");
        }
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        const formData: FormData = new FormData();
        formData.append("username", username);
        formData.append("password", password1);
        formData.append("email", email);
        const url: string = FETCH_URL + "register/";
        await axios.post(url, formData);
        setShouldRedirect(true);
    };

    const checkUserInput = (e: any) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    const checkEmailInput = (e: any) => {
        const re = /[a-zA-Z0-9|@|_|-|.]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Container fluid id="fondo">
                <Container fluid id="contenedor">
                    <Row className="justify-content-md-center">
                        <Col xs={11}>
                            <h1>Registrarse</h1>
                            <Form id="signin-form" onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Legajo</Form.Label>
                                    <InputGroup className="mb-3">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="button-tooltip-2" hidden={usrColor === ""}>
                                                    {usrMsg}
                                                </Tooltip>
                                            }>
                                            <Form.Control type="text" className="input" maxLength={16} placeholder="Ingrese legajo" name="username" onChange={handleUser} required style={{ borderColor: usrColor }} onKeyPress={checkUserInput} />
                                        </OverlayTrigger>
                                        <InputGroup.Text id="basic-addon1" className="input-icons" style={{ borderColor: usrColor }}>
                                            <Spinner animation="border" variant="primary" className="spinner" hidden={iconUser != 1} />
                                            <i className="bi bi-person icon" role="img" aria-label="input" hidden={iconUser != 0}></i>
                                            <i className="bi bi-person-x text-danger icon" role="img" aria-label="warning" hidden={iconUser != 3}></i>
                                            <i className="bi bi-person-check text-success icon" role="img" aria-label="success" hidden={iconUser != 2}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup className="mb-3">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="button-tooltip-2" hidden={emlColor === ""}>
                                                    {emlMsg}
                                                </Tooltip>
                                            }>
                                            <Form.Control type="text" className="input" maxLength={50} placeholder="Ingrese email" name="email" onChange={handleEmail} required style={{ borderColor: emlColor }} onKeyPress={checkEmailInput} />
                                        </OverlayTrigger>
                                        <InputGroup.Text id="basic-addon1" className="input-icons" style={{ borderColor: emlColor }}>
                                            <Spinner animation="border" variant="primary" className="spinner" hidden={iconEmail != 1} />
                                            <i className="bi bi-envelope icon" role="img" aria-label="input" hidden={iconEmail != 0}></i>
                                            <i className="bi bi-envelope-slash text-danger icon" role="img" aria-label="warning" hidden={iconEmail != 3}></i>
                                            <i className="bi bi-envelope-check text-success icon" role="img" aria-label="success" hidden={iconEmail != 2}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <Form.Text className="text-muted">Nunca compartiremos tu email con nadie sin tu autorización.</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <InputGroup className="mb-3">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="button-tooltip-2" hidden={pswColor === ""}>
                                                    {pswMsg}
                                                </Tooltip>
                                            }>
                                            <Form.Control type="password" className="input" maxLength={16} placeholder="Contraseña" name="password" onChange={handlePassword1} required style={{ borderColor: pswColor }} />
                                        </OverlayTrigger>
                                        <InputGroup.Text id="basic-addon1" className="input-icons" style={{ borderColor: pswColor }}>
                                            <i className="bi bi-key icon" role="img" aria-label="password" hidden={password1 != "" || password2 != ""}></i>
                                            <i className="bi bi-key text-danger icon" role="img" aria-label="password" hidden={password1 === password2}></i>
                                            <i className="bi bi-key text-success icon" role="img" aria-label="password" hidden={password1 != password2 || password1 === "" || password2 === ""}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <Container fluid className="required-password-fields">
                                        <span className="required-item" style={{ color: inputPassword1 }}>
                                            8 caractéres
                                        </span>
                                        <span className="required-item" style={{ color: inputPassword2 }}>
                                            Una mayúscula
                                        </span>
                                        <span className="required-item" style={{ color: inputPassword3 }}>
                                            Una minúscula
                                        </span>
                                    </Container>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Repita su contraseña</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control type="password" className="input" placeholder="Repita su contraseña" name="password" onChange={handlePassword2} required style={{ borderColor: pswColor }} />
                                        <InputGroup.Text id="basic-addon1" className="input-icons" style={{ borderColor: pswColor }}>
                                            <i className="bi bi-key icon" role="img" aria-label="password" hidden={password2 != "" || password1 != ""}></i>
                                            <i className="bi bi-key text-danger icon" role="img" aria-label="password" hidden={password1 === password2}></i>
                                            <i className="bi bi-key text-success icon" role="img" aria-label="password" hidden={password1 != password2 || password1 === "" || password2 === ""}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="submit" id="login-button" style={{ float: "right" }} disabled={usrColor !== "green" || emlColor !== "green" || pswColor !== "green" || !terms}>
                                    Registrarse
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {shouldRedirect ? <Navigate to="/register/authorization" /> : ""}
            </Container>
        </>
    );
};

export default RegisterComponent;
