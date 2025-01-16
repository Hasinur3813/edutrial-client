import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Homepage from "../pages/Homepage/Homepage";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEduTrial from "../pages/TeachOnEduTrial/TeachOnEduTrial";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Dashboard from "../layout/Dashboard";
import MyEnrollClass from "../pages/MyEnrollClass/MyEnrollClass";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyEnrollClassDetails from "../pages/MyEnrollClassDetails/MyEnrollClassDetails";

const queryClient = new QueryClient();

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: (
          <QueryClientProvider client={queryClient}>
            <Signup />
          </QueryClientProvider>
        ),
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/teach-on-edutrial",
        element: <TeachOnEduTrial />,
      },
      {
        path: "/class-details",
        element: <ClassDetails />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <MyProfile /> },
      {
        path: "/dashboard/my-enroll-class",
        element: <MyEnrollClass />,
      },
      {
        path: "/dashboard/my-enroll-class-details",
        element: <MyEnrollClassDetails />,
      },
    ],
  },
]);

export default router;
