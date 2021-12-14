import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Check from "./Check2.png";
import Error from "./Error2.png";
import { Image } from "react-bootstrap";
import "./ActivateAccount.css"
import { Nav } from "react-bootstrap";
import axios from "axios";
import FETCH_URL from "../../utils/fetchurl";

const ActivateAccount: FC = (): JSX.Element => {

    const [validActivation, setValidActivation] = useState(false);

    useEffect(() => {
        (async function() {
            const keyArr: string [] = window.location.toString().split("=");
            if (keyArr.length>1){
                const key: string = keyArr[1];
                const formData: FormData = new FormData();
                formData.append("key",key);
                const res = await axios.post(FETCH_URL + "activateaccount/", formData);
                if (res.status==200)
                    setValidActivation(true);
            }
            
        })();
    }, []);

    return <>
        <Header />
        <br />
        <Container fluid className="validation" hidden={!validActivation}>
            <Image src={Check} id="check"/>
            <h1>Tu cuenta ha sido activada satisfactoriamente.</h1>
        </Container>
        <Container fluid className="validation" hidden={validActivation}>
            <Image src={Error} id="check"/>
            <h1>El enlace de activación no es correcto o ha caducado.</h1>
        </Container>
        <br/>
        <br/>
        <Nav className="justify-content-center">
            <Nav.Item >
                <Nav.Link href="/login" id="sign-in">Iniciar sesión</Nav.Link>
            </Nav.Item>
        </Nav>
    </>
}

export default ActivateAccount