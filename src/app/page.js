import Banner from "@/components/landing/Banner";
import CourseBenefits from "@/components/landing/CourseBenefits";
import Internship from "@/components/landing/Internship";
import LastCourses from "@/components/landing/LastCourses";
import SampleEditor from "@/components/landing/SampleEditors";

export default function Home() {
  return (
    <div >
      <Banner />
      <LastCourses />
      <CourseBenefits />
      <Internship />
      <SampleEditor />
    </div>
  );
}
