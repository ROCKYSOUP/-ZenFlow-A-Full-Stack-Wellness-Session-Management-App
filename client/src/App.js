import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Login from "./pages/login"
import Home from "./pages/home"
import DashBoard from "./pages/dashboard"
import Register from "./pages/register"
import Account from "./pages/MyAccount"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/my-account" element={<Account/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/" element={<Register/>}/>
        </Routes>
      </Router>
      
  );
}

export default App;
