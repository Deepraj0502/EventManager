import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Type from './Components/Type';

function App() {
  AOS.init();
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Login/>]} />
        <Route path="/home" element={[<Homepage/>]} />
        <Route path="/type" element={[<Type/>]} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
