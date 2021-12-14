import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { Alert, Button, Container, Dropdown, DropdownButton, Pagination, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import store from "../../store/store";
import CONFIG_TOKEN from "../../utils/configtoken";
import FETCH_URL from "../../utils/fetchurl";
import axiosService from "../../utils/interceptor";
import Header from "../Header/Header";
import EditTask from "./EditTask";
import NewTask from "./NewTask";
import TaskDescription from "./TaskDescription";

const MyTasks : FC = (): JSX.Element => {

    const [showTaskEdit, setShowTaskEdit] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [currentTaskDescription, setCurrentTaskDescription] = useState("");
    const [currentTaskTitle, setCurrentTaskTitle] = useState("");
    const [currentTaskId, setCurrentTaskId] = useState("");
    const [currentTaskUser, setCurrentTaskUser] = useState("");
    const [result,setResult] = useState([]);

    //Paginacion
    const [activePage, setActivePage] = useState(1);
    const [countPages, setCountPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleLastPage = () => {
        setActivePage(countPages);
    }

    const handleFirstPage = () => {
        setActivePage(1);
    }

    const handleSpecificPage = (pageNumber: number) =>{
        setActivePage(pageNumber);
    }

    const handleNextPage = () => {
        setActivePage(activePage+1);
    }

    const handlePreviousPage = () => {
        setActivePage(activePage-1);
    }

    const handleShowAlert = () => {
        setShowAlert(true);
        const timerID = setInterval(function() {
            setShowAlert(false);
            clearInterval(timerID);
        }, 3 * 1000);
    }

    const handleAlertMessage = (message: string) => {
        setAlertMessage(message);
        loadResults();
    }

    const handleRowsPerPage = (rows: number) => {
        setRowsPerPage(rows);
        setCountPages(~~(result.length / rows)+1);
        setActivePage(1);
    }

    const handleNewTask = () => {
        setShowNewTask(!showNewTask);
    }

    const loadResults = async () => {
        const url: string = FETCH_URL + "tasksbyuser/?user=" + store.getState().auth.profile?.user;
            let res: AxiosResponse = await axiosService.get(url,CONFIG_TOKEN);
            if (res.data.length === 0){
                alert("No hay tareas!");
            }
            else{
                setCountPages(~~(res.data.length / rowsPerPage)+1);
                setResult(res.data);
            }
    }

    useEffect(() => {
        loadResults();   
    }, []);

    const handleShowTaskEdit = (description: string, title: string, id: string, user: string) => {
        setCurrentTaskDescription(description);
        setCurrentTaskTitle(title);
        setCurrentTaskId(id);
        setCurrentTaskUser(user);
        setShowTaskEdit(!showTaskEdit);
    }

    let items = [];
    for (let number = 1; number <= countPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handleSpecificPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return <>
        <Container fluid className="main">
            <h1>MIS TAREAS</h1>
            <br/>
            <DropdownButton id="dropdown-basic-button" title="TAREAS POR PÁGINA" style={{display: "inline", float:"left"}} variant="secondary">
                <Dropdown.Item onClick={() => handleRowsPerPage(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRowsPerPage(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRowsPerPage(20)}>20</Dropdown.Item>
            </DropdownButton>
            <Button variant="success" style={{float:'right'}} onClick={handleNewTask}>NUEVA TAREA</Button>
            <br/>
            <br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>FECHA</th>
                    <th>TÍTULO DE LA TAREA</th>
                    <th>DESCRIPCIÓN DE TAREA</th>
                    </tr>
                </thead>
                <tbody>
                    {result.slice((activePage-1) * rowsPerPage,activePage * rowsPerPage).map((result: any, index: any) => (
                        <tr key={index+(activePage-1) * rowsPerPage + 1}>
                            <td>{index+(activePage-1) * rowsPerPage + 1}</td>
                            <td>{result.date}</td>
                            <td>{result.title}</td>
                            <td>
                                <Button variant="secondary" onClick={() => handleShowTaskEdit(result.description, result.title, result.id, result.user)}>
                                        EDITAR TAREA
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={handleFirstPage}/>
                <Pagination.Prev onClick={handlePreviousPage} hidden={countPages===0} disabled= {activePage === 1}/>
                {items}
                <Pagination.Next onClick={handleNextPage} hidden = {countPages===0} disabled= {activePage === countPages} />
                <Pagination.Last onClick={handleLastPage}/>
            </Pagination>
        </Container>
        <Alert variant="success" hidden={!showAlert} id="alert">{alertMessage}</Alert>
        {showTaskEdit && <EditTask showModal={() => handleShowTaskEdit(currentTaskDescription, currentTaskTitle, currentTaskId, currentTaskUser)} taskId={currentTaskId} taskDescription={currentTaskDescription} taskTitle={currentTaskTitle} taskUser={currentTaskUser} setAlert={handleShowAlert} setAlertMessage={handleAlertMessage}/>}
        {showNewTask && <NewTask showModal={handleNewTask} showAlert={handleShowAlert} setAlertMessage={handleAlertMessage}/>}
    </>
}

export default MyTasks