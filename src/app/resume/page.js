import Sidebar from "../../components/resume/Sidebar";
import MainContent from "../../components/resume/MainContent"


export default function Home() {
  const profile = {
    name: 'John Doe',
    title: 'Software Engineer',
    image: '/images/profile.jpg',
    email: 'john.doe@example.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  };

  const skills = [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
  ];

  const education = [
    { degree: 'BSc in Computer Science', institution: 'University of Example', year: '2020' },
  ];

  const experience = [
    { position: 'Frontend Developer', company: 'Example Corp', year: '2021 - Present' },
  ];

  return (
    <div className="flex pt-32">
      <Sidebar />

      <MainContent />
    </div>
  );
}