

export interface WallpapersState {
    wallpapers: Array<object>;
    loading: boolean,
    error: string | null,
}
export interface FavoritesState {
    favorites: Array<object>;
    loading: boolean;
    error: string | null;
}
export interface UserState {
    email: string;
    idToken: string;
    localId: string;
    loginLoader: boolean;
    signupLoader: boolean;
}

export interface RootState {
    user: UserState;
    wallpapers: WallpapersState;
    favorites: FavoritesState;
}
