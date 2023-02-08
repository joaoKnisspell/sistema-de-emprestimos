//React
import { Routes, Route } from 'react-router-dom';

//Pages
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

//Private
import Private from './Private';
import New from '../pages/New';

const RoutesApp = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/dashboard" element={ <Private> <Dashboard /> </Private>} />
        <Route path="/profile" element={ <Private> <Profile/> </Private>} />
        <Route path="/new" element={ <Private> <New /> </Private>} />
        <Route path="/new/:id" element={ <Private> <New /> </Private>} />
    </Routes>
  )
}

export default RoutesApp