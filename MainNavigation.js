import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
const clearToken = () => {
  localStorage.removeItem("idToken");
};

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <button onClick={clearToken}>
              <Link to="/login">Logout</Link>
              </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
