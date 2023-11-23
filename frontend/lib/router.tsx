import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../src/routes/RootLayout";
import ErrorPage from "../src/routes/ErrorPage";
import PublicRoute from "../src/routes/PublicRoute";
import Login from "../src/features/auth/Login";
import Register from "../src/features/auth/Register";
import DashLayout from "../src/routes/DashLayout";
import Welcome from "../src/features/auth/Welcome";
import NotesList from "../src/features/notes/NotesList";
import UsersList from "../src/features/users/UsersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PublicRoute />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <DashLayout />,
        children: [
          // DASHBOARD INDEX
          {
            path: "",
            element: <Welcome />,
          },
          // DASHBOARD NOTES
          {
            path: "notes",
            children: [{ path: "", element: <NotesList /> }],
          },
          // DASHBOARD USERS
          {
            path: "users",
            children: [{ path: "", element: <UsersList /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
