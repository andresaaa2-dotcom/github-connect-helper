import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/context/QuizContext";
import { BloodTestProvider } from "@/context/BloodTestContext";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import Customize from "./pages/Customize";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import BloodTest from "./pages/BloodTest";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/recommendation" element={<Recommendation />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blood-test" element={<BloodTest />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
