import { FC } from "react";
import { Container, Image } from "react-bootstrap";
import Email from "./Email.png";
import "./RegisterAuth.css";

const RegisterAuth: FC = (): JSX.Element => {
    return (
        <>
            <Container fluid className="main">
                <h1>¡Gracias por registrarte!</h1>
                <br />
                <Image src={Email} id="email" />
                <h1>Hemos enviado un mail a tu dirección de correo electrónico. Sigue el enlace adjunto para activar tu cuenta.</h1>
                <br />
                <br />
            </Container>
        </>
    );
};

export default RegisterAuth;
