import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShowModalSearchTask } from "../../types/types";
import CONFIG_TOKEN from "../../utils/configtoken";
import FETCH_URL from "../../utils/fetchurl";
import axiosService from "../../utils/interceptor";

const SearchTasksFile: FC<ShowModalSearchTask> = (props): JSX.Element => {
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    const handleSave = async () => {
        const url: string = FETCH_URL + "tasksbyfile/?file=" + file;
        let res: AxiosResponse = await axiosService.get(url, CONFIG_TOKEN);
        if (res.data.length === 0) {
            props.setAlertMessage("¡Error! Legajo no encontrado.");
            props.setAlert();
            props.showModal();
        } else {
            navigate("/searchresults", { state: { results: res.data } });
        }
    };

    const handleClose = () => {
        props.showModal();
    };

    const checkFileInput = (e: any) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Modal show={true} size="lg" dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title" onHide={props.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <strong>BÚSQUEDA POR LEGAJO</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">LEGAJO</InputGroup.Text>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={10} onChange={e => setFile(e.target.value)} onKeyPress={checkFileInput} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        BUSCAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchTasksFile;
