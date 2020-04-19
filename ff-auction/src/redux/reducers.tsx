import { combineReducers } from 'redux'
import { SET_USER, SET_PLAYERS } from './actions';



export function users(state = {}, action: any) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}

export function players(state = [], action: any) {
    switch (action.type) {
        case SET_PLAYERS:
            return action.players;
        default:
            return state;
    }
}


const ffReducers = combineReducers({
    users,
    players
})

export default ffReducers;