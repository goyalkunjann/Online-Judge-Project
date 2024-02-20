import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Problems from "./components/Problems/Problems"; // Make sure the folder name is all lowercase to match your structure
import Resetpass from "./components/Resetpass/Resetpass"; // Make sure the folder name is all lowercase to match your structure


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/problems" element={<Problems />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Resetpass" element={<Resetpass />} />
          {/* Redirect logic commented out for simplicity */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
