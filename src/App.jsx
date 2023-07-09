import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default withAuthenticator(App);
