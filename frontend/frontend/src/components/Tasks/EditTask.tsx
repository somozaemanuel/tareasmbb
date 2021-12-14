import { FC, useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import store from "../../store/store";
import { EditTaskArgs } from "../../types/types";
import CONFIG_TOKEN from "../../utils/configtoken";
import FETCH_URL from "../../utils/fetchurl";
import axiosService from "../../utils/interceptor";

const EditTask: FC<EditTaskArgs> = (props): JSX.Element => {
    const [taskDescription, setTaskDescription] = useState(props.taskDescription);
    const [taskTitle, setTaskTitle] = useState(props.taskTitle);

    const handleSave = async () => {
        const url: string = FETCH_URL + "tasks/" + props.taskId + "/";
        const formData: FormData = new FormData();
        formData.append("title", taskTitle);
        formData.append("description", taskDescription);
        formData.append("user", props.taskUser);
        await axiosService.put(url, formData, CONFIG_TOKEN);
        props.setAlertMessage("Tarea modificada exitosamente.");
        props.setAlert();
        props.showModal();
    };

    const handleDelete = async () => {
        const url: string = FETCH_URL + "tasks/" + props.taskId + "/";
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + store.getState().auth.token,
            },
        };
        await axiosService.delete(url, config);
        props.setAlertMessage("Tarea eliminada exitosamente.");
        props.setAlert();
        props.showModal();
    };

    const handleClose = () => {
        props.showModal();
    };

    return (
        <>
            <Modal size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: "bold" }}>EDITAR TAREA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label id="label-task">TÍTULO DE LA TAREA:</Form.Label>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={50} value={taskTitle} size="lg" onChange={e => setTaskTitle(e.target.value)} />
                        <Form.Label id="label-task">DESCRIPCIÓN DE LA TAREA:</Form.Label>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={3000} as="textarea" value={taskDescription} size="lg" onChange={e => setTaskDescription(e.target.value)} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        ELIMINAR
                    </Button>
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

export default EditTask;
