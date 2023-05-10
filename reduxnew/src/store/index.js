import { createStore } from "redux";
import { CONSTANTS } from "../Constants/Countercontants";
const reducer = (state={counter:0},action) =>{
    if(action.type === CONSTANTS.INC){
        return {
            counter: state.counter+1
        }
    }
    if(action.type===CONSTANTS.INCBYANY){
        return {
            counter: state.counter + action.payload
        }
    }
    return state;
} 

const store = createStore(reducer);
export default store;

