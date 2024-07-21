import { Dispatch } from 'redux';
import { API, API_KEY } from '../apis';
import {
    GET_WALLPAPER_REQUEST,
    GET_WALLPAPER_SUCCESS,
    GET_WALLPAPER_FAILURE,
    WallpaperActionTypes
} from './index';
import { createClient, Photo } from 'pexels';

const client = createClient(API_KEY);
interface PexelsResponse {
    photos: Photo[];
}

export const getWallpapers = (query: string) => {
    return async (dispatch: Dispatch<WallpaperActionTypes>) => {
        dispatch({ type: GET_WALLPAPER_REQUEST });
        try {
            const response: PexelsResponse = await client.photos.search({ query, per_page: 20 });
            dispatch({
                type: GET_WALLPAPER_SUCCESS,
                payload: response.photos
            });
        } catch (error: any) {
            dispatch({
                type: GET_WALLPAPER_FAILURE,
                payload: error.message || 'An error occurred'
            });
        }
    };
};