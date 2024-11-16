// app/page.tsx (or pages/index.tsx if using Next.js)

import React from "react";
import Test from "./landingTest/test"; // Import Test component
import AssessmentCard from "./Search(without Login)/page"; // Import AssessmentCard component
import ParticlesComponent from "../../components/particles"; // Import ParticlesComponent
import WrappedExampleComponent from "./components/ExampleComponent"; // Import WrappedExampleComponent
import Search_Login from "./Search_Login/searchLogin";
import Navbar from "../../components/Navbar";

export default function Page() {
  return (
    <>
      {/* Particle Effect Component */}
      <ParticlesComponent id="particles" />

      {/* Assessment Card Component */}
      <AssessmentCard />

      {/* Test Component */}
      <Test />

      {/* Fetch Credit Score Component (If needed, uncomment the next line) */}
      {/* <FetchCreditScore /> */}

    </>
  );
}
