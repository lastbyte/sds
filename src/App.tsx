import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import Discover from "./pages/discover";
import Whiteboard from "./pages/whiteboard";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-svh w-full flex-col items-start relative">
      <Navigation />
      <div className="flex w-full flex-1 flex-col items-center min-hsvh overflow-auto mt-15">
        <Routes>
          {/* Define your routes here */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/" element={<Discover />} />
          <Route path="/whiteboard/:slug" element={<Whiteboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
