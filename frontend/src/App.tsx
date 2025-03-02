import "./components/Navbar";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./pages/Root";
import HomePage from "./pages/Home";
import GenericPage from "./pages/GenericPage";
import ArticlePage from "./pages/ArticlePage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootNavigation />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/article/:id", element: <ArticlePage />},
      { path: "/:slug", element: <GenericPage /> },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
