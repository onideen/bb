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
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootNavigation;
