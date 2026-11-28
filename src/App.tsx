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
import Sagp from "./pages/Sagp";
import SagpService from "./pages/SagpService";
import WorkWithAquila from "./pages/WorkWithAquila";
import Contracting from "./pages/Contracting";

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
          <Route path="/soar-as-you-go" element={<Sagp />} />
          <Route path="/soar-as-you-go/quick-fix" element={<SagpService offer="quick"/>}/>
          <Route path="/soar-as-you-go/black-friday-starter" element={<SagpService offer="starter"/>}/>
          <Route path="/soar-as-you-go/professional-service" element={<SagpService offer="professional"/>}/>
          <Route path="/work-with-aquila" element={<WorkWithAquila />} />
          <Route path="/government-contracting" element={<Contracting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
