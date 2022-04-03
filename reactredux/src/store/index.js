import {createStore} from 'redux';
export const INC = "inc",DEC = 'dec',INCREASE = 'increase',SHOWCOUNTER = 'showCounter';

const counterReducer = (state={counter: 0,showCounter: true},action)=>{
    switch(action.type){
        case INC: return {
            ...state,
            counter: state.counter + 1
        }
        case DEC: return{
            ...state,
            counter: state.counter - 1
        }
        case INCREASE:return{
            ...state,
            counter: state.counter + action.value
        }
        case SHOWCOUNTER:return{...state,showCounter:!state.showCounter}
        default:{
            return state
        }
    }
}
const store = createStore(counterReducer);

export default store;