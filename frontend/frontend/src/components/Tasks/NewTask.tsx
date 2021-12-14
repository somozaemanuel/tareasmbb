import { FC, useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { NewTaskArgs } from "../../types/types";
import "./NewTask.css";
import store from "../../store/store";
import axiosService from "../../utils/interceptor";
import FETCH_URL from "../../utils/fetchurl";
import CONFIG_TOKEN from "../../utils/configtoken";

const NewTask: FC<NewTaskArgs> = (props): JSX.Element => {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTitle, setTaskTitle] = useState("");

    const handleClose = () => {
        props.showModal();
    };

    const handleSave = async () => {
        const formData: FormData = new FormData();
        formData.append("user", store.getState().auth.profile?.id.toString()!);
        formData.append("description", taskDescription);
        formData.append("title", taskTitle);
        await axiosService.post(FETCH_URL + "tasks/", formData, CONFIG_TOKEN);
        props.setAlertMessage("Tarea cargada exitosamente.");
        props.showAlert();
        props.showModal();
    };

    return (
        <>
            <Modal size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: "bold" }}>AGREGAR NUEVA TAREA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label id="label-task">TÍTULO DE LA TAREA:</Form.Label>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={50} size="lg" onChange={e => setTaskTitle(e.target.value)} />
                        <Form.Label id="label-task">DESCRIPCIÓN DE LA TAREA:</Form.Label>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={3000} as="textarea" size="lg" onChange={e => setTaskDescription(e.target.value)} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        GUARDAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewTask;
