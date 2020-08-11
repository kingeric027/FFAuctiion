import { User } from 'ordercloud-javascript-sdk';
import { PlayerData } from '../App';
import { Theme } from '@material-ui/core';

//action types
export const SET_USER = 'SET_USER';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_THEME = 'SET_THEME';

//action creators
export function setUser(user: User) {
    return {type: SET_USER, user}
}

export function setPlayers(players: PlayerData[]) {
    return {type: SET_PLAYERS, players}
}

export function setTheme(theme: Theme) {
    return {type: SET_THEME, theme}
}