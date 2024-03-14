import React from "react";
import { useSearchParams } from "react-router-dom";

export default function About() {
  const restaurantName = (
    <span className="font-bold text-amber-400">HomeBurger</span>
  );
  return (
    <div>
      <div className="m-20 p-20 bg-slate-200 rounded-lg shadow-lg">
        <h2 className="font text-3xl font-bold">
          Welcome to {restaurantName} - Where Passion Meets Flavor
        </h2>

        <br />

        <p>
          At {restaurantName}, we believe in more than just serving burgers;
          we're here to create an experience that tantalizes your taste buds and
          leaves you craving for more. Nestled in the heart of Port Said, our
          burger joint is more than a place to grab a quick bite – it's a
          culinary journey that celebrates the art of crafting the perfect
          burger.
        </p>

        <br />

        <h2 className="font text-2xl font-bold">Our Story: A Delicious Beginning</h2>

        <br />

        <p>
          Founded in 2017, {restaurantName} was born out of a shared passion for
          exceptional food and a love for bringing people together. Our journey
          started with a simple idea: to redefine the classic burger experience.
          From that spark of inspiration, we set out to create a haven for
          burger enthusiasts and flavor seekers.
        </p>

        <br />

        <h2 className="font text-2xl font-bold">
          Crafting Culinary Masterpieces: The {restaurantName} Difference
        </h2>

        <br />

        <p>
          What sets us apart? It's our commitment to quality, creativity, and a
          relentless pursuit of flavor perfection. We source only the finest,
          freshest ingredients to ensure that every bite is a burst of
          deliciousness. Our chefs are culinary artists, infusing passion into
          every patty, topping, and sauce. Each burger on our menu tells a story
          of flavors carefully curated to create an unforgettable dining
          experience.
        </p>

        <br />

        <h2 className="font text-2xl font-bold">Beyond Burgers: A Diverse Menu</h2>

        <br />

        <p>
          While burgers are our pride and joy, our menu goes beyond the bun.
          Discover a variety of handcrafted sides, signature sauces, and
          indulgent desserts that complement the star of the show – our burgers.
          Vegetarian or meat lover, we've got something to satisfy every
          craving.
        </p>

        <br />

        <h2 className="font text-2xl font-bold">Community Matters: Our Commitment</h2>

        <br />

        <p>
          At {restaurantName}, we believe in giving back to the community that
          has embraced us. From sourcing locally whenever possible to supporting
          local initiatives, we're dedicated to making a positive impact.
        </p>

        <br />

        <h2 className="font text-2xl font-bold">Your Culinary Adventure Awaits</h2>

        <br />

        <p>
          Whether you're a loyal regular or stepping into {restaurantName} for
          the first time, we welcome you to embark on a culinary adventure. Join
          us in savoring the flavors, celebrating the joy of good company, and
          creating memories that linger long after the last bite.
        </p>
      </div>

      <div className="my-10 text-center italic">
        Thank you for being a part of the {restaurantName} family. We look
        forward to serving you a slice of happiness on every plate.
      </div>
    </div>
  );
}
