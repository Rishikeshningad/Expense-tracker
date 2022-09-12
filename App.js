import { Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Complete from './components/Layout/Complete';
import CompleteNow from './components/Layout/CompleteNow';
import Email from './components/Layout/Email';
import Cart from './components/Cart/Cart';

function App() {
   const showCart = useSelector(state => state.ui.cartIsVisible);
  return (
    <Layout>
       {showCart && <Cart/>} 
      <Switch>
      
        <Route path='/' exact> <HomePage/>  </Route>
        <Route path='/signup'> <SignPage/> </Route>
        <Route path='/login'> <Login/> </Route>
        <Route path='/complete'> <Complete/> </Route>
        <Route path='/complete_now'> <CompleteNow/> </Route>
        <Route path='/email'> <Email/> </Route>
        
      </Switch>
    </Layout>
  );
}

export default App;