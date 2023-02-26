import Akyte from "./Pages/Akyte";
import { Routes, Route } from "react-router-dom";
import Ciklai from "./Pages/Ciklai";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Homepage from "./Pages/Homepage";
import Client from "./Pages/Client";
import Errorpage from "./Pages/Errorpage";
import RequireAuth from "./Components/RequireAuth";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    // {
    //   element: <RequireAuth />,
    //   children: [
        {
          path: "/",
          element: <Akyte />,
          errorElement: <Errorpage />,
          children: [
            {
              index: true,
              element: <Homepage />,
            },
            {
              path: "client/:id",
              element: <Client />,
            },
            {
              path: "ciklai",
              element: <Ciklai />,
            },
          ],
        },
    //   ],
    // },
    {
      path: "login",
      element: <SignIn />,
      errorElement: <Errorpage />,
    },
    {
      path: "register",
      element: <SignUp />,
      errorElement: <Errorpage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
