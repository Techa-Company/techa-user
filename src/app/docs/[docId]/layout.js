export const metadata = {
  title: "تکا | دوره های ما",
  description: "تکا",
};

import Sidebar from "../../../components/layout/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <div className="flex 2xl:gap-10 gap-5">
          <Sidebar />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
