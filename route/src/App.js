import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Welcome from './components/Welcome';
import Products from './components/Products';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        
        <Route path='/welcome'>
          <Welcome />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/products/:productId/:id'>
          <ProductDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
