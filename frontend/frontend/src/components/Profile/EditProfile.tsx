import { FC } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useState } from "react";
import { ProfileResponse, ReducerAction, ShowModalProfile } from "../../types/types";
import store from "../../store/store";
import authSlice from "../../store/slices";
import axiosService from "../../utils/interceptor";
import FETCH_URL from "../../utils/fetchurl";
import CONFIG_TOKEN from "../../utils/configtoken";

const EditProfile: FC<ShowModalProfile> = (props): JSX.Element => {
    const [nombre, setNombre] = useState(store.getState().auth.profile?.name);
    const [apellido, setApellido] = useState(store.getState().auth.profile?.surname);

    const handleClose = () => props.showModal();

    const handleSave = async () => {
        const url: string = FETCH_URL + "profile/" + store.getState().auth.profile?.id + "/";
        const formData: FormData = new FormData();
        formData.append("name", nombre!);
        formData.append("surname", apellido!);
        formData.append("user", store.getState().auth.profile?.user.toString()!); //me lo requiere, arreglasr
        await axiosService.put(url, formData, CONFIG_TOKEN);
        let profile: ProfileResponse = store.getState().auth.profile!;
        profile = { ...profile, name: nombre!, surname: apellido! };
        let userData: ReducerAction = authSlice.actions.saveUserData({ token: store.getState().auth.token!, refreshToken: store.getState().auth.refreshToken!, profile: profile, staff: store.getState().auth.staff! });
        store.dispatch(userData);
        props.updateProfile();
        props.showModal();
        props.setAlert();
    };

    return <>
        <Modal size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>EDITAR PERFIL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">NOMBRE</InputGroup.Text>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={20} value={nombre} onChange={e => setNombre(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">APELLIDO</InputGroup.Text>
                        <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" maxLength={20} value={apellido} onChange={e => setApellido(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        GUARDAR CAMBIOS
                    </Button>
                </Modal.Footer>
        </Modal>
    </>
};

export default EditProfile;
