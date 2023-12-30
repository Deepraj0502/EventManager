import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import AOS from "aos";
import "aos/dist/aos.css";
import Type from "./Components/Type";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Components/Profile/Profile";
import EventHome from "./Components/EventHome";
import AddEventForm from "./Components/AddEventForm";
import Success from "./Components/Success";
import SampleTicket from "./Components/SampleTicket";
import Ticket from "./Components/Ticket";
import LikedEvents from "./Components/LikedEvents";

function App() {
  AOS.init();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={[<Login />]} />
          <Route path="/home" element={[<Homepage />]} />
          <Route path="/type" element={[<Type />]} />
          <Route path="/profile" element={[<Profile />]} />
          <Route path="/eventhome" element={[<EventHome />]} />
          <Route path="/addevent" element={[<AddEventForm />]} />
          <Route path="/success" element={[<Success />]} />
          <Route path="/sampleticket" element={[<SampleTicket />]} />
          <Route path="/ticket" element={[<Ticket />]} />
          <Route path="/likedevents" element={[<LikedEvents />]} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
