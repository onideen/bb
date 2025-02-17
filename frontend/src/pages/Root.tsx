import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootNavigation = () => {
  //const navigation = useNavigation();

  return (
    <>
      <div id="modal"></div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootNavigation;
