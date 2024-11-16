import React from "react";import LandingPage from "./landingPage/page";
import Test from "./landingTest/test";
import FetchCreditScore from "./landingScore/score";
import AssessmentCard from "./Search(without Login)/page";
import ParticlesComponent from "../../components/particles";

export default function Page() {
  return (
    <>
      <ParticlesComponent id="particles" />
      <AssessmentCard />
      {/* <LandingPage />; */}
      <Test />;
      {/* <FetchCreditScore/>; */}
    </>
  );
}

