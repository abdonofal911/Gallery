import axios from 'axios';
import { Dispatch } from 'redux';
import { storeUserData } from '../storage';
import { AUTH_URL, SERVER_KEY } from '../apis';
import {
    LOGOUT_USER,
    SAVE_USER_INFO,
    LOGIN_PENDING,
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    SIGNUP_PENDING,
    SIGNUP_FULFILLED,
    SIGNUP_REJECTED,
    UserActionTypes,
    LogoutAction,
    SaveUserInfoAction,
    LoginPendingAction,
    LoginFulfilledAction,
    LoginRejectedAction,
    SignupPendingAction,
    SignupFulfilledAction,
    SignupRejectedAction
} from './index';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';


interface UserData {
    email: string;
    idToken: string;
    localId: string;
    password: string;
}

const usersCollection = firestore().collection('users');

export const logOutUser = (): LogoutAction => ({
    type: LOGOUT_USER,
});

export const saveUserInfo = (userData: UserData): SaveUserInfoAction => ({
    type: SAVE_USER_INFO,
    payload: userData,
});

export const login = ({ email, password }: { email: string; password: string; }) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch<LoginPendingAction>({ type: LOGIN_PENDING });
    try {
        const response = await axios.post(
            `${AUTH_URL}/accounts:signInWithPassword?key=${SERVER_KEY}`,
            {
                email,
                password,
            },
        );

        dispatch<LoginFulfilledAction>({
            type: LOGIN_FULFILLED,
            payload: response.data,
        });

        storeUserData(response.data);
    } catch (error: any) {
        dispatch<LoginRejectedAction>({
            type: LOGIN_REJECTED,
            payload: error.response?.data?.error?.message || 'An error occurred',
        });
        Alert.alert(error.response.data.error.message);
    }
};

export const signup = ({ email, password }: { email: string; password: string; }) => async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch<SignupPendingAction>({ type: SIGNUP_PENDING });
    try {
        const response = await axios.post(
            `${AUTH_URL}/accounts:signUp?key=${SERVER_KEY}`,
            {
                email,
                password,
            },
        );

        const { localId } = response.data;

        await usersCollection.doc(localId).set({
            email: email,
            favorites: [],
        });

        dispatch<SignupFulfilledAction>({
            type: SIGNUP_FULFILLED,
            payload: response.data,
        });

        storeUserData(response.data);

    } catch (error: any) {
        dispatch<SignupRejectedAction>({
            type: SIGNUP_REJECTED,
            payload: error.response?.data?.error?.message || 'An error occurred',
        });
        Alert.alert(error.response.data.error.message);

    }
};
