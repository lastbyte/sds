import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navigation";
import Discover from "./pages/discover";
import Whiteboard from "./pages/whiteboard";
import "./index.css";
import "./App.css";
import Interview from "./pages/interview";
import { useInterviewState } from "./contexts/interview-context";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  const location = useLocation();
  const { state, actions } = useInterviewState();

  // Check if we're on an interview page
  const isInterviewPage = location.pathname.startsWith("/interview/");

  return (
    <div className="flex h-svh w-full flex-col items-start relative">
      <Navigation
        showSolutionButton={isInterviewPage}
        isSolution={state.isSolution}
        isDialogOpen={state.isDialogOpen}
        isEvaluationDialogOpen={state.isEvaluationDialogOpen}
        onToggleSolution={actions.setIsSolution}
        onDialogOpenChange={actions.setIsDialogOpen}
        onEvaluationDialogOpenChange={actions.setIsEvaluationDialogOpen}
      />
      <ScrollArea className="flex w-full max-h-svh flex-1 flex-col items-center pt-15">
        <Routes>
          {/* Define your routes here */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/" element={<Discover />} />
          <Route
            path="/interview/:slug"
            element={
              <Interview
                isSolution={state.isSolution}
                setIsSolution={actions.setIsSolution}
              />
            }
          />
          <Route path="/whiteboard/:slug" element={<Whiteboard />} />
        </Routes>
      </ScrollArea>
    </div>
  );
}

export default App;
