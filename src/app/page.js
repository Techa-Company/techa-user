import Banner from "@/components/landing/Banner";
import CourseBenefits from "@/components/landing/CourseBenefits";
import LastCourses from "@/components/landing/LastCourses";

export default function Home() {
  return (
    <div >
      <Banner />
      <LastCourses />
      <CourseBenefits />
    </div>
  );
}
