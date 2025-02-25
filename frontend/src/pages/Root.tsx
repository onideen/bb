import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const RootNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    window.history.replaceState({}, "", location.pathname);
  }, [location]);

  return (
    <>
      <div id="modal"></div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen pt-22">
        <Outlet />
      </main>
    </>
  );
};

export default RootNavigation;
