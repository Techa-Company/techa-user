import Banner from "../components/landing/Banner";
import CourseBenefits from "../components/landing/CourseBenefits";
import Internship from "../components/landing/Internship";
import LastCourses from "../components/landing/LastCourses";
import LastArticles from "../components/landing/LastArticles";
import Projects from "../components/landing/Projects";
import Poster from "../components/landing/Poster";
import SampleEditor from "../components/landing/SampleEditors";
import Certificate from "../components/landing/Certificate";
import Roadmap from "../components/landing/Roadmap";
import LevelAssessment from "../components/landing/LevelAssessment";

export default function Home() {
  return (
    <div>
      <Banner />
      <Poster />
      {/* <LevelAssessment /> */}
      <LastCourses />
      <Roadmap />
      <CourseBenefits />
      <Certificate />
      <Internship />
      <Projects />
      <SampleEditor />
      <LastArticles />
    </div>
  );
}
