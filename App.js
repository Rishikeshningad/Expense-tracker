import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Complete from './components/Layout/Complete';
import CompleteNow from './components/Layout/CompleteNow';
import Email from './components/Layout/Email';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact> <HomePage/> </Route>
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
