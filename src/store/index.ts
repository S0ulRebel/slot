import { createStore } from 'redux'
import {combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

interface slotAction {
    type: string,
    payload: any
}

export const saveSymbol = (index: number, value: number) => {
    return {
        type: "SAVE_SYMBOL",
        payload: {
            index,
            value
        }
    }
}

export const updateAmount = (amount: number) => {
    return {
        type: "UPDATE_AMOUNT",
        payload: amount
    }
}

export const updateLastWin = (amount: number) => {
    return {
        type: "UPDATE_LAST_WIN",
        payload: amount
    }
}

export const updateBet = (amount: number) => {
    return {
        type: "UPDATE_BET",
        payload: amount
    }
}

const symbols = (state: number[] = [], action: slotAction): number[] => {
    switch(action.type) {
        case 'SAVE_SYMBOL':
            const newState = [...state];
            const index = action.payload.index;
            newState[index] = action.payload.value;
            return newState;
        default:
            return state;
    }
}

interface creditsState { amount: number, bet: number, lastWin: number }
const initialCreditsState = {amount: 1000, bet: 100, lastWin: 0}

const credits = (state: creditsState = initialCreditsState, action: slotAction): creditsState => {
    switch(action.type) {
        case 'UPDATE_AMOUNT':
            return {
                ...state,
                amount: action.payload
            };
        case 'UPDATE_LAST_WIN':
            return {
                ...state,
                lastWin: action.payload
            };
        case 'UPDATE_BET':
            return {
                ...state,
                bet: action.payload
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    symbols,
    credits
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;