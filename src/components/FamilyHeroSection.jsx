import React from "react";
import { Link } from "react-router-dom";

const FamilyHeroSection = () => {
  return (
    <section className="w-full bg-[#FAF9F6] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <img
                src="/frontimg.jpg"
                alt="Happy woman and child playing together"
                className="w-full rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col space-y-6">

            <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
              Family Moments Made Better
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Shop Smarter
              <br />
              Live Happier
            </h1>

            <p className="text-lg text-gray-700 max-w-md">
              Discover handpicked products for your home, family, and everyday
              life — quality you can trust at prices you'll love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              {/* SHOP NOW BUTTON → WOMEN PAGE */}
              <Link
                to="/women"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition text-center"
              >
                Shop Now
              </Link>

              {/* EXPLORE COLLECTIONS → ALL PRODUCTS OR WOMEN */}
              <Link
                to="/women"
                className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition text-center"
              >
                Explore Collections
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FamilyHeroSection;
