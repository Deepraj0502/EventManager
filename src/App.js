import './App.css';
import Events from './Components/Events';
import NavbarComponent from './Components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import YourEvent from './Components/YourEvent';
import Register from './Components/Registration';
import Login from './Components/Login';
import AddEvent from './Components/AddEvent';
import Liked from './Components/Liked';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Login/>]} />
        <Route path="/register" element={[<Register/>]} />
        <Route path="/addevent" element={[<NavbarComponent/>,<AddEvent/>]} />
        <Route path="/globalevents" element={[<NavbarComponent/>,<Events/>]} />
        <Route path="/yourevents" element={[<NavbarComponent/>,<YourEvent/>]} />
        <Route path="/liked" element={[<NavbarComponent/>,<Liked/>]} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
