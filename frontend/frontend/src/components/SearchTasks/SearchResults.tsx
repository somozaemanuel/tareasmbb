import { FC, useEffect, useState } from "react";
import { Button, Container, Dropdown, DropdownButton, Pagination, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import TaskDescription from "../Tasks/TaskDescription";

const SearchResults: FC = (): JSX.Element => {

    const location = useLocation();

    const [showTaskDescription, setShowTaskDescription] = useState(false);
    const [currentTaskDescription, setCurrentTaskDescription] = useState("");

      //Paginacion
      const [activePage, setActivePage] = useState(1);
      const [countPages, setCountPages] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleShowTaskDescription = (description: string) => {
        setCurrentTaskDescription(description);
        setShowTaskDescription(!showTaskDescription);
    }

    const handleRowsPerPage = (rows: number) => {
        setRowsPerPage(rows);
        setCountPages(~~(location.state.results.length / rows)+1);
        setActivePage(1);
    }

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

    let items = [];
    for (let number = 1; number <= countPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handleSpecificPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    const loadResults = async () => {
            if (location.state.results.length === 0){
                alert("No hay tareas!");
            }
            else{
                setCountPages(~~(location.state.results.length / rowsPerPage)+1);
            }
    }

    useEffect(() => {
        loadResults();   
    }, []);

    return <>
        <Container fluid className="main">
            <h1>Resultados de la búsqueda</h1>
            <br/>
            <DropdownButton id="dropdown-basic-button" title="TAREAS POR PÁGINA" style={{display: "inline", float:"left"}} variant="secondary">
                <Dropdown.Item onClick={() => handleRowsPerPage(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRowsPerPage(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRowsPerPage(20)}>20</Dropdown.Item>
            </DropdownButton>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>FECHA</th>
                    <th>NOMBRE</th>
                    <th>LEGAJO</th>
                    <th>TÍTULO DE LA TAREA</th>
                    <th>DESCRIPCIÓN DE TAREA</th>
                    </tr>
                </thead>
                <tbody>
                {location.state.results.slice((activePage-1) * rowsPerPage,activePage * rowsPerPage).map((result: any, index: any) => (
                        <tr key={index}>
                            <td>{index+(activePage-1) * rowsPerPage + 1}</td>
                            <td>{result.date}</td>
                            <td>{result.user_data.name}</td>
                            <td>{result.user_data.username}</td>
                            <td>{result.title}</td>
                            <td>
                                    <Button variant="secondary" onClick={() => handleShowTaskDescription(result.description)}>
                                        VER DESCRIPCIÓN
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
        {showTaskDescription && <TaskDescription showModal={() => handleShowTaskDescription(currentTaskDescription)} description={currentTaskDescription}/>}
    </>
}

export default SearchResults