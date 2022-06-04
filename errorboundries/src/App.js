import logo from './logo.svg';
import './App.css';
import User from './User';
import ErrorBoundries from './ErrorHandle/ErrorBoundries';

function App() {
  return (
    <div className="App">
      <ErrorBoundries>
        <User name="mannsh"/>
      </ErrorBoundries>
      <ErrorBoundries>
        <User name="ABC"/>
      </ErrorBoundries>
      <ErrorBoundries>
        <User name="ABCD"/>
      </ErrorBoundries>
    </div>
  );
}

export default App;
