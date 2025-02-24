import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootNavigation = () => {
  //const navigation = useNavigation();

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
