import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowModalSearchTask } from "../../types/types";
import DatePicker from "react-datepicker";
import axiosService from "../../utils/interceptor";
import FETCH_URL from "../../utils/fetchurl";
import CONFIG_TOKEN from "../../utils/configtoken";

const SearchTasksFD: FC<ShowModalSearchTask> = props => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    const handleClose = () => {
        props.showModal();
    };

    const handleSearch = async () => {
        const url: string = FETCH_URL + "tasksbydateandfile/?start_date=" + startDate.toISOString().substring(0, 10) + "&end_date=" + endDate.toISOString().substring(0, 10) + "&file=" + file;
        let res: AxiosResponse = await axiosService.get(url, CONFIG_TOKEN);
        if (res.data.length === 0) {
            props.setAlertMessage("¡Error! No existen tareas entre las fechas dadas / legajo no correcto.");
            props.setAlert();
            props.showModal();
        } else {
            navigate("/searchresults", { state: { results: res.data } });
        }
    };

    const checkFileInput = (e: any) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    const checkDateInput = (e: any) => {
        const re = /[]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Modal show={true} size="lg" dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title" onHide={props.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <strong>BÚSQUEDA POR FECHA Y LEGAJO</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">LEGAJO</InputGroup.Text>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={10} onChange={e => setFile(e.target.value)} onKeyPress={checkFileInput} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <span>
                            <InputGroup.Text id="inputGroup-sizing-default" className="display-group">
                                DESDE
                            </InputGroup.Text>
                            <DatePicker className="display-group" selected={startDate} peekNextMonth dateFormat="yyyy-MM-dd" onKeyDown={checkDateInput} onChange={(date: any) => setStartDate(date)} />
                        </span>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <span>
                            <InputGroup.Text id="inputGroup-sizing-default" className="display-group">
                                HASTA
                            </InputGroup.Text>
                            <DatePicker className="display-group" selected={endDate} peekNextMonth dateFormat="yyyy-MM-dd" onKeyDown={checkDateInput} onChange={(date: any) => setEndDate(date)} />
                        </span>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" onClick={handleSearch}>
                        BUSCAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchTasksFD;
