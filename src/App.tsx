import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LaunchGate from "./components/LaunchGate";
import ProjectNotebook from "./components/ProjectNotebook";
import LegalPage from "./pages/LegalPage";
import StartPage from "./pages/StartPage";
import WorkWithAquila from "./pages/WorkWithAquila";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LaunchGate><Index /></LaunchGate>} />
          <Route path="/vision-lab" element={<ProjectNotebook standalone />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/intellectual-property" element={<LegalPage kind="intellectual-property" />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/work-with-aquila" element={<WorkWithAquila />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
