const redux = require("redux");

const reducer = (state ={counter : 0},action) =>{
    switch(action.type){
        case 'inc': return{
            counter: state.counter + 1
        }
        case 'dec':return {
            counter: state.counter - 1
        }
        default: return state;
    }
}

const store = redux.createStore(reducer);

const subscriberComponent = () =>{
   const latestState =  store.getState();
   console.log(latestState);
};
const secSubscriber = () =>{
    console.log(store.getState(),"dd")
}
store.subscribe(subscriberComponent);
store.subscribe(secSubscriber);
store.dispatch({type:"inc"});
store.dispatch({type:"dec"});