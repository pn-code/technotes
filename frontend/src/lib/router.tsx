import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../routes/RootLayout";
import ErrorPage from "../routes/ErrorPage";
import PublicRoute from "../routes/PublicRoute";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import DashLayout from "../routes/DashLayout";
import Welcome from "../features/auth/Welcome";
import NotesList from "../features/notes/NotesList";
import UsersList from "../features/users/UsersList";
import EditUser from "../features/users/EditUser";
import NewUserForm from "../features/users/NewUserForm";
import EditNote from "../features/notes/EditNote";
import NewNote from "../features/notes/NewNote";
import PersistLogin from "../features/auth/PersistLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Public Routes
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

      // Private Routes
      {
        element: <PersistLogin />,
        children: [
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
                children: [
                  { path: "", element: <NotesList /> },
                  { path: ":id", element: <EditNote /> },
                  { path: "new", element: <NewNote /> },
                ],
              },
              // DASHBOARD USERS
              {
                path: "users",
                children: [
                  { path: "", element: <UsersList /> },
                  { path: ":id", element: <EditUser /> },
                  { path: "new", element: <NewUserForm /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
