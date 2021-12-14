import { ProfileResponse, ReducerAction } from '../types/types';

export const saveUserData = (token: string, refreshToken: string, profile: ProfileResponse, staff: boolean ): ReducerAction => { 
    return {
        type: "@saveUserData",
        payload: {
            token: token,
            refreshToken: refreshToken,
            profile: profile,
            staff: staff,
        }
    }
}