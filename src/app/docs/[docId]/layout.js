export const metadata = {
  title: "تکا | دوره های ما",
  description: "تکا",
};

import ConditionalSidebar from "../../../components/layout/ConditionalSidebar";

export default function Layout({ children }) {
  return (
    <div className="pt-32">
      <div className="container px-5 mx-auto">
        <div className="flex gap-10">
          <ConditionalSidebar />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
