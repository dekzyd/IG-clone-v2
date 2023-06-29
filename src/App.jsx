import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <h2>There was an error...</h2>,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
