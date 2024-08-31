import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Players from "./components/Players";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-col content-center items-center pt-20 overflow-hidden gap-10">
        <Navbar />

        <Routes>
          <Route path="/players" element={<Players />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
