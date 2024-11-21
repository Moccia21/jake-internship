import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  const saveScrollPosition = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  useEffect(() => {
    // Restore scroll position when the component mounts
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, savedScrollPosition);
    }

    // Add event listener to save the scroll position on page unload
    window.addEventListener("beforeunload", saveScrollPosition);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
