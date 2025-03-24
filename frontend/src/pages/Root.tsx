import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootNavigation = () => {
  return (
    <>
      <div id="modal"></div>
      <header className="border-b">
        <Navbar />
      </header>
      <main className="min-h-screen pt-2">
        <Outlet />
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-sm text-gray-600">
          © 2025 Bærum Birøkterlag
        </div>
      </footer>
    </>
  );
};

export default RootNavigation;
