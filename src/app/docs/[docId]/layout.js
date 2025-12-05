export const metadata = {
  title: "تکا | دوره های ما",
  description: "تکا",
};

import { Bounce, ToastContainer } from "react-toastify";
import ConditionalSidebar from "../../../components/layout/ConditionalSidebar";

export default function Layout({ children }) {
  return (
    <div className="pt-32">
      <div className="container px-5 mx-auto">
        <div className="flex lg:gap-5">
          <ConditionalSidebar />
          <main className="w-full">{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      </div>
    </div>
  );
}
