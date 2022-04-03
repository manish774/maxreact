import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../store/Auth';
const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticate =  useSelector((state)=>state.auth.isAuthenticate)
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
      { isAuthenticate &&
        <ul> 
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={()=>dispatch(AuthActions.logout())}>Logout</button>
          </li>
        </ul>
      }
      </nav>
    </header>
  );
};

export default Header;
