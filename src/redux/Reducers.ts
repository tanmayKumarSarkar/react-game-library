import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'

  
export interface Game {
    id: number,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: Date,
    freetogame_profile_url: string
}

export interface GameState {
    games: Game[]
}

const initialGameState: GameState = {
    games: []
};

export interface GenreState {
    genres: string[]
}

const initialGenreState: GenreState = {
    genres: []
}

const gameSlice = createSlice({
    name: 'game',
    initialState : initialGameState,
    reducers: {
        getGames: (state) => state,
        loadGames: (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload
        },
        addGame: (state, action: PayloadAction<Game>) => {
            console.log('Add game', state);
            state.games.push(action.payload);
        },
        updateGame: (state, action: PayloadAction<Game>) => {
            const games = [...state.games];
            games.map(g => { 
                if (g.id == action.payload.id) {
                    return {...g, ...action.payload}
                } return g;
            });
            state.games = games;
        },
        deleteGame: (state, action: PayloadAction<Game>) => {
            const games = state.games.filter(g => g.id != action.payload.id);
            state.games = games;
        }
    }
});

const genreSlice = createSlice({
    name: "genre",
    initialState: initialGenreState,
    reducers: {
        getGenres: (state) => state,
        loadGenres: (state, action: PayloadAction<string[]> ) => {
            state.genres = action.payload;
        }
    }
});

export const combinedReducer = combineReducers({
    games: gameSlice.reducer,
    genres: genreSlice.reducer
});

export const { loadGames, addGame, updateGame, deleteGame } = gameSlice.actions;
export const { getGenres, loadGenres } = genreSlice.actions;