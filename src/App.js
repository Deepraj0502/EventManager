<<<<<<< Updated upstream
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Type from './Components/Type';
=======
import "./App.css";
import Events from "./Components/Events";
import NavbarComponent from "./Components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YourEvent from "./Components/YourEvent";
import Register from "./Components/Registration";
import Login from "./Components/Login";
import AddEvent from "./Components/AddEvent";
import Liked from "./Components/Liked";
import Profile from "./Components/Profile/Profile";
import "filepond/dist/filepond.min.css";
>>>>>>> Stashed changes

function App() {
  AOS.init();
  return (
    <>
<<<<<<< Updated upstream
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Login/>]} />
        <Route path="/home" element={[<Homepage/>]} />
        <Route path="/type" element={[<Type/>]} />
      </Routes>
    </BrowserRouter>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={[<Login />]} />
          <Route path="/register" element={[<Register />]} />
          <Route
            path="/addevent"
            element={[<NavbarComponent />, <AddEvent />]}
          />
          <Route
            path="/globalevents"
            element={[<NavbarComponent />, <Events />]}
          />
          <Route
            path="/yourevents"
            element={[<NavbarComponent />, <YourEvent />]}
          />
          <Route path="/liked" element={[<NavbarComponent />, <Liked />]} />
          <Route path="/profile" element={[<Profile />]} />
        </Routes>
      </BrowserRouter>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
