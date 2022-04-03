import { useSelector,useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { counterAction } from "../store/Counter";
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) =>  state.counter.counter);
  const showCounter = useSelector((state)=>state.counter.showCounter);
  const toggleCounterHandler = () => {
    dispatch(counterAction.showCounter());
  };
  const incrementHandler = () => {
    dispatch(counterAction.increment());
  };
  const decrementHandler = () => {
    dispatch(counterAction.decrement());
  };
  const increaseByAnyNum = () => {
    dispatch(counterAction.incrementByAny(5));
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {showCounter &&  <div>
        <div className={classes.value}>{counter}</div>
        <div>
          <button onClick={incrementHandler}>Increment</button>
          <button onClick={increaseByAnyNum}>Increase by any</button>
          <button onClick={decrementHandler}>Decrement</button>
        </div>
      </div>}

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;
