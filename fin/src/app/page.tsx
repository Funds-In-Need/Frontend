import React from "react";
import LandingPage from "./landingPage/landing_page";
import Test from "./landingTest/test";
import FetchCreditScore from "./landingScore/score";
import AssessmentCard from "./Search(without Login)/Search_page";
import ParticlesComponent from "../../components/particles";

export default function Page() {
  return (
    <>
      <ParticlesComponent id="particles" />
      <AssessmentCard />
      // return <LandingPage />;
      // return <Test />;
      // return <FetchCreditScore/>;
    </>
  );
}
