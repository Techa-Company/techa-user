import Banner from "../components/landing/Banner";
import CourseBenefits from "../components/landing/CourseBenefits";
import Internship from "../components/landing/Internship";
import LastCourses from "../components/landing/LastCourses";
import LastArticles from "../components/landing/LastArticles";
import Poster from "../components/landing/Poster";
import SampleEditor from "../components/landing/SampleEditors";

export default function Home() {
  return (
    <div>
      <Banner />
      <Poster />
      <LastCourses />
      <CourseBenefits />
      <Internship />
      <SampleEditor />
      <LastArticles />
    </div>
  );
}
