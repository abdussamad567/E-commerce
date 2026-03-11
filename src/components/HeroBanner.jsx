import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative w-full">

      {/* HERO IMAGE */}
      <img
        src="/backffss.png"
        alt="Hero Banner"
        className="w-full h-auto"
      />

      {/* TEXT OVERLAY */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">

        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          FADE
        </h1>

        <p className="text-lg md:text-xl tracking-widest mb-6">
          EXTREME STYLE
        </p>

        <Link
          to="/men"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          SHOP NOW
        </Link>

      </div>

    </section>
  );
};

export default HeroBanner;
