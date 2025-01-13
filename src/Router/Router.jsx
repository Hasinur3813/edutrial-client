import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Homepage from "../pages/Homepage/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);

export default router;
