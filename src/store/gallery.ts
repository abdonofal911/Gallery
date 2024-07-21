import {
    GET_WALLPAPER_REQUEST,
    GET_WALLPAPER_SUCCESS,
    GET_WALLPAPER_FAILURE
} from '../actions/index';
import { WallpapersState } from './types';

const initialState: WallpapersState = {
    wallpapers: [],
    loading: false,
    error: null
};

const wallpaperReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_WALLPAPER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_WALLPAPER_SUCCESS:
            return {
                ...state,
                loading: false,
                wallpapers: action.payload
            };
        case GET_WALLPAPER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default wallpaperReducer;
