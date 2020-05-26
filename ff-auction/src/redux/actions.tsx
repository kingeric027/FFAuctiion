import { User } from 'ordercloud-javascript-sdk';
import { PlayerData } from '../App';

//action types
export const SET_USER = 'SET_USER';
export const SET_PLAYERS = 'SET_PLAYERS';

//action creators
export function setUser(user: User) {
    return {type: SET_USER, user}
}

export function setPlayers(players: PlayerData[]) {
    return {type: SET_PLAYERS, players}
}