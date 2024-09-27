import { useContext } from 'react';
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom';
import Auth from './components/Auth/Auth';

import Home from './components/Home/Home';
import { AuthContext } from './context/AuthContext';

type Props = {}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if(!authenticated) return <Navigate to='/login' replace />
  return <Outlet />
}

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path='/' element={<Auth />}/>
      <Route path='/login' element={<Auth />}/>
      <Route element={<PrivateRoutes />}>
        <Route path='/home' element={<Home />} />
      </Route>
    </Router>
  )
}

export default Routes;