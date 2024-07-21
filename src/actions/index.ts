export const LOGOUT_USER = 'LOGOUT_USER';

export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';

export const GET_WALLPAPER_REQUEST = 'GET_WALLPAPER_REQUEST';
export const GET_WALLPAPER_SUCCESS = 'GET_WALLPAPER_SUCCESS';
export const GET_WALLPAPER_FAILURE = 'GET_WALLPAPER_FAILURE';

export const ADD_FAVORITE_PENDING = 'ADD_FAVORITE_PENDING';
export const ADD_FAVORITE_FULFILLED = 'ADD_FAVORITE_FULFILLED';
export const ADD_FAVORITE_REJECTED = 'ADD_FAVORITE_REJECTED';

export const DELETE_FAVORITE_PENDING = 'DELETE_FAVORITE_PENDING';
export const DELETE_FAVORITE_FULFILLED = 'DELETE_FAVORITE_FULFILLED';
export const DELETE_FAVORITE_REJECTED = 'DELETE_FAVORITE_REJECTED';

export const GET_FAVORITES_PENDING = 'GET_FAVORITES_PENDING';
export const GET_FAVORITES_FULFILLED = 'GET_FAVORITES_FULFILLED';
export const GET_FAVORITES_REJECTED = 'GET_FAVORITES_REJECTED';

export interface LogoutAction {
    type: typeof LOGOUT_USER;
}

export interface SaveUserInfoAction {
    type: typeof SAVE_USER_INFO;
    payload: object;
}

export interface LoginPendingAction {
    type: typeof LOGIN_PENDING;
}

export interface LoginFulfilledAction {
    type: typeof LOGIN_FULFILLED;
    payload: object;
}

export interface LoginRejectedAction {
    type: typeof LOGIN_REJECTED;
    payload: string;
}

export interface SignupPendingAction {
    type: typeof SIGNUP_PENDING;
}

export interface SignupFulfilledAction {
    type: typeof SIGNUP_FULFILLED;
    payload: object;
}

export interface SignupRejectedAction {
    type: typeof SIGNUP_REJECTED;
    payload: string;
}

interface GetWallpaperRequestAction {
    type: typeof GET_WALLPAPER_REQUEST;
}
export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    src: {
        original: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
    };
}
interface GetWallpaperSuccessAction {
    type: typeof GET_WALLPAPER_SUCCESS;
    payload: Photo[];
}

interface GetWallpaperFailureAction {
    type: typeof GET_WALLPAPER_FAILURE;
    payload: string;
}


interface AddFavoritePendingAction {
    type: typeof ADD_FAVORITE_PENDING;
}

interface AddFavoriteFulfilledAction {
    type: typeof ADD_FAVORITE_FULFILLED;
    payload: object;
}

interface AddFavoriteRejectedAction {
    type: typeof ADD_FAVORITE_REJECTED;
    payload: string;
}

interface DeleteFavoritePendingAction {
    type: typeof DELETE_FAVORITE_PENDING;
}

interface DeleteFavoriteFulfilledAction {
    type: typeof DELETE_FAVORITE_FULFILLED;
    payload: object;
}

interface DeleteFavoriteRejectedAction {
    type: typeof DELETE_FAVORITE_REJECTED;
    payload: string;
}

interface GetFavoritesPendingAction {
    type: typeof GET_FAVORITES_PENDING;
}

interface GetFavoritesFulfilledAction {
    type: typeof GET_FAVORITES_FULFILLED;
    payload: Array<object>;
}

interface GetFavoritesRejectedAction {
    type: typeof GET_FAVORITES_REJECTED;
    payload: string;
}

export type FavoriteActionTypes =
    | AddFavoritePendingAction
    | AddFavoriteFulfilledAction
    | AddFavoriteRejectedAction
    | DeleteFavoritePendingAction
    | DeleteFavoriteFulfilledAction
    | DeleteFavoriteRejectedAction
    | GetFavoritesPendingAction
    | GetFavoritesFulfilledAction
    | GetFavoritesRejectedAction;

export type UserActionTypes =
    | LogoutAction
    | SaveUserInfoAction
    | LoginPendingAction
    | LoginFulfilledAction
    | LoginRejectedAction
    | SignupPendingAction
    | SignupFulfilledAction
    | SignupRejectedAction;


export type WallpaperActionTypes =
    | GetWallpaperRequestAction
    | GetWallpaperSuccessAction
    | GetWallpaperFailureAction;