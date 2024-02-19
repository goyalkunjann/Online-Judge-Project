
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/Resetpass';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
