import './App.css';
import Home from './component/home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Profile from './component/profile';
import Login from './component/login';
import Signup from './component/signup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
