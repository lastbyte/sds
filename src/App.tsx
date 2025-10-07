import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/navigation";
import { ScrollArea } from "./components/ui/scroll-area";
import "./index.css";
import Discover from "./pages/discover";
import Interview from "./pages/interview";
import Whiteboard from "./pages/whiteboard";

function App() {
  return (
    <div className="flex h-svh w-full flex-col items-start">
      <Navigation />
      <ScrollArea className="flex w-full h-full flex-1 flex-col items-center pt-15 relative">
        <Routes>
          {/* Define your routes here */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/" element={<Discover />} />
          <Route path="/interview/:slug" element={<Interview />} />
          <Route path="/whiteboard/:slug" element={<Whiteboard />} />
        </Routes>
      </ScrollArea>
    </div>
  );
}

export default App;
