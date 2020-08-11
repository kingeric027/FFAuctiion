import { combineReducers } from 'redux'
import { SET_USER, SET_PLAYERS, SET_THEME } from './actions';



export function user(state = {}, action: any) {
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

export function selectedTheme(state={}, action: any) {
    switch(action.type) {
        case SET_THEME:
            return action.theme
        default:
            return state;
    }
}


const ffReducers = combineReducers({
    user,
    players, 
    selectedTheme
})

export default ffReducers;