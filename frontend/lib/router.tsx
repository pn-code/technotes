import { createBrowserRouter } from "react-router-dom";
import Root from "../src/routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

export default router;
