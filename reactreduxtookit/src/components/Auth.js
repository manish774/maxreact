import classes from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AuthActions } from '../store/Auth';
const Auth = () => {
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const dispatch = useDispatch()
  const loginHandler = e =>{
    e.preventDefault();
    dispatch(AuthActions.login())
  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
