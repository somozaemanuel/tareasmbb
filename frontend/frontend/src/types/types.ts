import React from "react";
import { List } from "reselect/es/types";

export interface ProfileResponse {
      id: bigint;
      name: string;
      surname: string;
      bio: string;
      address: string;
      tel: string;
      user: bigint;
      picture: string;
}


export type State = {
    token: string | null;
    refreshToken: string | null;
    profile: ProfileResponse | null;
    staff: boolean | null;
};

export type ReducerAction = {
    type: string;
    payload: {
        token: string | null;
        refreshToken: string | null;
        profile: ProfileResponse | null;
        staff: boolean | null;
    }
}

export interface ShowModalProfile {
    showModal: VoidFunction;
    updateProfile: VoidFunction;
    setAlert: VoidFunction;
}

export interface ShowModalTerms {
    showModal: VoidFunction;
}

export interface NewTaskArgs {
    showModal: VoidFunction;
    showAlert: VoidFunction;
    setAlertMessage: Function;
}

export interface ShowModalSearchTask {
    showModal: VoidFunction;
    setAlert: VoidFunction;
    setAlertMessage: Function;
}


export interface ShowModalTaskDescription {
    showModal: VoidFunction;
    description: string;
}

export interface EditTaskArgs {
    taskTitle: string;
    taskDescription: string;
    taskId: string;
    taskUser: string;
    showModal: VoidFunction;
    setAlert: VoidFunction;
    setAlertMessage: Function;
}

export interface Permissions {
    redirectOnFailure: string;
}