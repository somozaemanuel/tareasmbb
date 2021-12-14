import { FC } from "react";
import { Modal } from "react-bootstrap";
import { ShowModalTaskDescription } from "../../types/types";

const TaskDescription: FC<ShowModalTaskDescription> = (props) => {
    return <>
        <Modal show={true} size="lg" dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title" onHide={props.showModal}>
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    <strong>INFORMACIÓN DE LA TAREA</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.description}</p>
            </Modal.Body>            
        </Modal>
    </>
}

export default TaskDescription;