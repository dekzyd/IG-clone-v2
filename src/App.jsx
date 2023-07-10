import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreatePost from "./pages/CreatePost";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App({ signOut, user }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <h2>There was an error...</h2>,
      children: [
        {
          index: true,
          element: <Homepage signOut={signOut} user={user} />,
        },
        {
          path: "profile/:username",
          element: <ProfilePage user={user} />,
        },
        {
          path: "settings",
          element: <SettingsPage user={user} />,
        },
        {
          path: "add_post",
          element: <CreatePost />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose="2000"></ToastContainer>
      <RouterProvider router={router} />
    </>
  );
}

export default withAuthenticator(App);
