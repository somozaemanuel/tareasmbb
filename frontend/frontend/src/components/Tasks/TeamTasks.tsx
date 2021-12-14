import { FC, useState } from "react";
import { Container, Button, ButtonGroup, Alert } from "react-bootstrap";
import Header from "../Header/Header";
import SearchTasksDate from "../SearchTasks/SearchTasksDate";
import SearchTasksFD from "../SearchTasks/SearchTasksFD";
import SearchTasksFile from "../SearchTasks/SearchTasksFile";
import "./TeamTasks.css";

const TeamTasks: FC = () => {
    const [showSearchTaskD, setShowSearchTaskD] = useState(false);
    const [showSearchTaskF, setShowSearchTaskF] = useState(false);
    const [showSearchTaskFD, setShowSearchTaskFD] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleShowSearchTaskF = () => {
        setShowSearchTaskF(!showSearchTaskF);
    };

    const handleShowSearchTaskD = () => {
        setShowSearchTaskD(!showSearchTaskD);
    };

    const handleShowSearchTaskFD = () => {
        setShowSearchTaskFD(!showSearchTaskFD);
    };

    const handleShowAlert = () => {
        setShowAlert(true);
        const timerID = setInterval(() => {
            setShowAlert(false);
            clearInterval(timerID);
        }, 3 * 1000);
    };

    const handleAlertMessage = (message: string) => {
        setAlertMessage(message);
    };

    return (
        <>
            <Container fluid id="container">
                <h1>Tareas del equipo</h1>
                <ButtonGroup id="search-buttons-div" vertical>
                    <Button variant="primary" className="search-button" onClick={handleShowSearchTaskF}>
                        BUSCAR POR LEGAJO
                    </Button>
                    <Button variant="primary" className="search-button" onClick={handleShowSearchTaskD}>
                        BUSCAR POR FECHA
                    </Button>
                    <Button variant="primary" className="search-button" onClick={handleShowSearchTaskFD}>
                        BUSCAR POR LEGAJO Y FECHA
                    </Button>
                </ButtonGroup>
            </Container>
            <Alert variant="danger" hidden={!showAlert} id="alert">
                {alertMessage}
            </Alert>
            {showSearchTaskF && <SearchTasksFile showModal={handleShowSearchTaskF} setAlert={handleShowAlert} setAlertMessage={handleAlertMessage} />}
            {showSearchTaskD && <SearchTasksDate showModal={handleShowSearchTaskD} setAlert={handleShowAlert} setAlertMessage={handleAlertMessage} />}
            {showSearchTaskFD && <SearchTasksFD showModal={handleShowSearchTaskFD} setAlert={handleShowAlert} setAlertMessage={handleAlertMessage} />}
        </>
    );
};

export default TeamTasks;
