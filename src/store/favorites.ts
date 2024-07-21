import { array } from 'yup';
import {
    ADD_FAVORITE_PENDING,
    ADD_FAVORITE_FULFILLED,
    ADD_FAVORITE_REJECTED,
    DELETE_FAVORITE_PENDING,
    DELETE_FAVORITE_FULFILLED,
    DELETE_FAVORITE_REJECTED,
    GET_FAVORITES_PENDING,
    GET_FAVORITES_FULFILLED,
    GET_FAVORITES_REJECTED,
    FavoriteActionTypes
} from '../actions/index';
import { FavoritesState } from './types';


const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null,
};

const favoritesReducer = (state = initialState, action: FavoriteActionTypes) => {
    switch (action.type) {
        case GET_FAVORITES_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_FAVORITES_FULFILLED:
            return {
                ...state,
                loading: false,
                favorites: action.payload,
            };
        case GET_FAVORITES_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_FAVORITE_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_FAVORITE_FULFILLED:
            return {
                ...state,
                loading: false,
            };
        case ADD_FAVORITE_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_FAVORITE_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_FAVORITE_FULFILLED:
            return {
                ...state,
                loading: false,
            };


        case DELETE_FAVORITE_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default favoritesReducer;
