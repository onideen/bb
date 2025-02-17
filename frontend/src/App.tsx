import "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./pages/Root";
import HomePage from "./pages/HomeOld";
import AboutUs from "./pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootNavigation />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/om-oss", element: <AboutUs /> },
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
