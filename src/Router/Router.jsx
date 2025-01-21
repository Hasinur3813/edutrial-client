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
import AllClassForAdmin from "../pages/AllClassForAdmin/AllClassForAdmin";
import Users from "../pages/Users/Users";
import Payment from "../pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <TeachOnEduTrial />
          </PrivateRoute>
        ),
      },
      {
        path: "/class-details/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  // dashboard route
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // student dashboard
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-enroll-class",
        element: <MyEnrollClass />,
      },
      {
        path: "/dashboard/my-enroll-class-details/:id",
        element: <MyEnrollClassDetails />,
      },

      // teacher dashboard
      {
        path: "/dashboard/add-class",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "/dashboard/my-class",
        element: (
          <TeacherRoute>
            <MyClass />
          </TeacherRoute>
        ),
      },
      {
        path: "/dashboard/my-class-details/:id",
        element: (
          <TeacherRoute>
            <MyClassDetails />
          </TeacherRoute>
        ),
      },

      // admin dashboard
      {
        path: "/dashboard/teacher-request",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-classes",
        element: (
          <AdminRoute>
            <AllClassForAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/page-not-found",
    element: <ErrorPage />,
  },
]);

export default router;
