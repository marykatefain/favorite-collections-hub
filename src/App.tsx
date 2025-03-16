
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Charts from "./pages/Charts";
import Discover from "./pages/Discover";
import ItemDetail from "./pages/ItemDetail";
import CollectionDetail from "./pages/CollectionDetail";
import AddCollection from "./pages/AddCollection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
          <Route path="/collection/add" element={<AddCollection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
