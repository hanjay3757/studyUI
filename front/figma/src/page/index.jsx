import React from "react";
import "./index.css";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import FeaturedStores from "../components/FeaturedStores/FeaturedStores";
import Services from "../components/Services/Services";
import Events from "../components/Events/Events";
import Footer from "../components/Footer/Footer";

export default function Main() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Hero />
        <FeaturedStores />
        <Services />
        <Events />
      </main>
      <Footer />
    </div>
  );
}
