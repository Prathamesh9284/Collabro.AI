import Sidebar from "@/app/_components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-80">
        {children}
      </main>
    </div>
  );
}