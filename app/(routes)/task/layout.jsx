import Sidebar from "@/app/_components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-80 md:ml-80 sm:ml-10">
        {children}
      </main>
    </div>
  );
}