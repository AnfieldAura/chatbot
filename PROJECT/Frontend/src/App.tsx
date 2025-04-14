import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Align from "./pages/Align";
import StudentLogin from "./pages/StudentLogin";
import ParentLogin from "./pages/ParentLogin";
import MainChat from "./components/chat/MainChat";
import NoSign from "./components/layout/AppLayout0";
import AppLayout from "./components/layout/AppLayout";
import './index.css';

const queryClient = new QueryClient();

/**
 * The `App` component serves as the root component of the application.
 * It wraps the application with several providers and sets up routing.
 *
 * Providers:
 * - `QueryClientProvider`: Provides React Query's `QueryClient` to manage server state.
 * - `TooltipProvider`: Provides context for tooltips throughout the application.
 * - `Toaster`: Displays toast notifications.
 * - `Sonner`: Manages additional notifications.
 *
 * Routing:
 * - Uses `BrowserRouter` to enable client-side routing.
 * - Defines routes using `Routes` and `Route` components:
 *   - `/`: Renders the `Index` component.
 *   - `/align`: Renders the `Align` component.
 *   - `/student-login`: Renders the `StudentLogin` component.
 *   - `/parent-login`: Renders the `ParentLogin` component.
 *   - `/chat`: Renders the `MainChat` component.
 *   - `*`: A catch-all route that renders the `NotFound` component for undefined paths.
 *
 * Note:
 * - All custom routes should be added above the catch-all `*` route to ensure proper routing.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/align" element={<Align />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/parent-login" element={<NoSign />} />
          <Route path="/student" element={<AppLayout />} />
          <Route path="/chat" element={<MainChat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
