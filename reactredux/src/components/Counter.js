import { useSelector, useDispatch, connect } from "react-redux";
import classes from "./Counter.module.css";
import { INC } from "../store";
const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state)=>state.showCounter);
  const toggleCounterHandler = () => {
    dispatch({ type: "showCounter" });
  };
  
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({ type: INC });
  };
  const decrementHandler = () => {
    dispatch({ type: "dec" });
  };
  const increaseByAnyNum = () => {
    dispatch({ type: "increase", value: 5 });
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {showCounter &&  <div>
        <div className={classes.value}>{counter}</div>
        <div>
          <button onClick={incrementHandler}>Increment</button>
          <button onClick={increaseByAnyNum}>Increase by any</button>
          <button onClick={decrementHandler}>Decrement {process.env.HELLO}</button>
        </div>
      </div>}

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// class Counter extends Component{
//   incrementHandler = ()=>{
//     dispatch({type:"inc"});
//   }
//   decrementHandler = ()=>{
//     dispatch({type:"dec"})
//   }
//   render(
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{counter}</div>
//         <div>
//         <button onClick={this.incrementHandler}>Increment</button>
//         <button onClick={this.decrementHandler}>Decrement</button>
//         </div>
//         <button onClick={toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   )
// }
export default Counter;
