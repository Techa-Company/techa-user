import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../components/contexts/AuthContext";
import 'react-loading-skeleton/dist/skeleton.css';
import { Bounce, ToastContainer } from "react-toastify";
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export const metadata = {
  title: "پلتفرم آموزشی تکا | Techa",
  description: "پلتفرم آموزشی تکا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <link rel="icon" href="/images/favicon.svg" sizes="any" />
      <body>
        <AuthProvider>
          <Header />
          <main className="mb-40 md:mb-60">{children}</main>
          <Footer />

        </AuthProvider>
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
      </body>
    </html>
  );
}
