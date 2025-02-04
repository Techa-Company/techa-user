// app/dashboard/layout.tsx
import Sidebar from "../../components/account/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Sidebar />
            <section className="flex-1 px-5 sm:px-10 pt-32 lg:mr-72">
                {children}
            </section>
        </>
    )
}