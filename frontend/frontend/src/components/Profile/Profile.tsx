import { useEffect, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import "./Profile.css";
import store from "../../store/store";
import EditProfile from "./EditProfile";
import { Navigate } from "react-router-dom";

function Profile(): JSX.Element {
    const [showEdit, setShowEdit] = useState(false);
    const [hideAlert, setHideAlert] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [name, setName] = useState(store.getState().auth.profile?.name);
    const [surname, setSurname] = useState(store.getState().auth.profile?.surname);
    const [file, setFile] = useState(store.getState().auth.profile?.user);

    const handleShow = () => setShowEdit(!showEdit);

    const handleAlert = () => {
        setHideAlert(false);
        const timerID = setInterval(function () {
            setHideAlert(true);
            clearInterval(timerID);
        }, 3 * 1000);
    };

    const updateProfile = () => {
        setName(store.getState().auth.profile?.name);
        setSurname(store.getState().auth.profile?.surname);
        setFile(store.getState().auth.profile?.user);
    };

    useEffect(() => {
        setShouldRedirect(store.getState().auth.token === null);
    });

    return (
        <>
            {shouldRedirect ? <Navigate to="/login" /> : ""}
            <Container fluid id="bg">
                <h1 className="test">DATOS PERSONALES</h1>
                <h3>NOMBRE: {name} </h3>
                <h3>APELLIDO: {surname}</h3>
                <h3>LEGAJO: {file}</h3>
                <br/>
                <Button onClick={handleShow}>EDITAR PERFIL</Button>
                <Alert variant="success" hidden={hideAlert} id="alert">
                    Datos actualizados correctamente.
                </Alert>
                {showEdit && <EditProfile showModal={handleShow} updateProfile={updateProfile} setAlert={handleAlert} />}
            </Container>
        </>
    );
}

export default Profile;
