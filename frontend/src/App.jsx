import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Examples from "./pages/Examples";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Plants from "./pages/Plants";
import IndividualPlant from "./pages/IndividualPlant";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutError from "./pages/CheckoutError";

function App() {
  useEffect(() => {
    const checkoutAttempt = localStorage.getItem("checkoutAttempt");
    if (checkoutAttempt === null) {
      localStorage.setItem("checkoutAttempt", 0);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:plantID" element={<IndividualPlant />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/error" element={<CheckoutError />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
