import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Homepage from "../pages/Homepage/Homepage";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEduTrial from "../pages/TeachOnEduTrial/TeachOnEduTrial";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Dashboard from "../layout/Dashboard";
import MyEnrollClass from "../pages/MyEnrollClass/MyEnrollClass";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyEnrollClassDetails from "../pages/MyEnrollClassDetails/MyEnrollClassDetails";
import AddClass from "../pages/AddClass/AddClass";
import MyClass from "../pages/MyClass/MyClass";
import MyClassDetails from "../pages/MyClassDetails/MyClassDetails";
import TeacherRequest from "../pages/TeacherRequest/TeacherRequest";
import AllClass from "../pages/AllClass/AllClass";
import Users from "../pages/Users/Users";

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
        element: <Signup />,
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
      {
        path: "/dashboard/add-class",
        element: <AddClass />,
      },
      {
        path: "/dashboard/my-class",
        element: <MyClass />,
      },
      {
        path: "/dashboard/my-class-details",
        element: <MyClassDetails />,
      },
      {
        path: "/dashboard/teacher-request",
        element: <TeacherRequest />,
      },
      {
        path: "/dashboard/all-classes",
        element: <AllClass />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
