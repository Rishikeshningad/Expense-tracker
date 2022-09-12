import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

import { useDispatch } from 'react-redux';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
const clearToken = () => {
  localStorage.removeItem("idToken");
};

const dispatch = useDispatch();

const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
};

const isAuth = useSelector(state => state.auth.isAuthenticated)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
         {isAuth && (<ul><li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li></ul>)}
          {!isAuth && (<li>
            <button onClick={clearToken}>
              <Link to="/login">Logout</Link>
              </button>
              </li>)}
              {!isAuth && (<li>
                <button onClick={toggleCartHandler}>
                    <span>Cart</span>
                    <span>0</span>
                </button>
              </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;