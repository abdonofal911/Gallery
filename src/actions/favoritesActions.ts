import { Dispatch } from 'redux';
import firestore from '@react-native-firebase/firestore';
import {
    ADD_FAVORITE_PENDING,
    ADD_FAVORITE_FULFILLED,
    ADD_FAVORITE_REJECTED,
    DELETE_FAVORITE_PENDING,
    DELETE_FAVORITE_FULFILLED,
    DELETE_FAVORITE_REJECTED,
    GET_FAVORITES_FULFILLED,
    FavoriteActionTypes
} from './index';

const usersCollection = firestore().collection('users');

export const addFavorite = (userId: string, favorite: object) => async (dispatch: Dispatch<FavoriteActionTypes>) => {
    dispatch({ type: ADD_FAVORITE_PENDING });
    try {
        await usersCollection.doc(userId).update({
            favorites: firestore.FieldValue.arrayUnion(favorite),
        });
        dispatch({
            type: ADD_FAVORITE_FULFILLED,
            payload: favorite,
        });
    } catch (error: any) {
        dispatch({
            type: ADD_FAVORITE_REJECTED,
            payload: error,
        });
        console.error('Error adding favorite: ', error);
    }
};

export const deleteFavorite = (userId: string, favorite: object) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_FAVORITE_PENDING });
    try {
        await usersCollection.doc(userId).update({
            favorites: firestore.FieldValue.arrayRemove(favorite),
        });
        dispatch({
            type: DELETE_FAVORITE_FULFILLED,
        });
    } catch (error) {
        dispatch({
            type: DELETE_FAVORITE_REJECTED,
            payload: error,
        });
        console.error('Error deleting favorite: ', error);
    }
};

export const setFavorites = (payload: any) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: GET_FAVORITES_FULFILLED, payload });
    }
}
