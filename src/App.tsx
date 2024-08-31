{
  /* Page imoprts */
}
import Home from "./pages/Home";
import Team from "./pages/Team";
import Rules from "./pages/Rules";
import Players from "./pages/Players";
import Error from "./pages/Error";
{
  /* Components imoprts */
}
import Navbar from "./components/Navbar";
import LivePlayers from "./components/LivePlayers";
{
  /* React router dom imoprts */
}
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PVPStats from "./components/PVPStats";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-screen h-screen flex flex-col content-center items-center pt-20 overflow-x-hidden gap-10">
        <Navbar />

        <Routes>
          <Route path="/players" element={<Players />}>
            <Route path="live" element={<LivePlayers />} />
            <Route path="pvp" element={<PVPStats />} />
          </Route>
          <Route path="/team" element={<Team />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
