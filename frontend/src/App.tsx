import "./components/Navbar";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./pages/Root";
import GenericPage from "./pages/GenericPage";
import ArticlePage from "./pages/ArticlePage";
import EventPage from "./pages/EventPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootNavigation />,
    children: [
      { path: "/artikler/:id", element: <ArticlePage /> },
      { path: "/arrangementer/:slug", element: <EventPage /> },
      { path: "/:path?", element: <GenericPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
