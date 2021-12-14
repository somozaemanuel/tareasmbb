import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import authSlice from "../../store/slices";
import store from "../../store/store";

const Logout: FC = () => {

    useEffect(() => {
        store.dispatch(authSlice.actions.logout());
    });
    

    return <>
        <Container fluid>
            <h1>¡Gracias! Ha cerrado sesión exitosamente.</h1>
        </Container>
    </>
}

export default Logout;