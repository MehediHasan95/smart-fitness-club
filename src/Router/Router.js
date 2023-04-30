import { createBrowserRouter } from "react-router-dom";
import AddServices from "../Components/Admin/AddServices";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import AuthList from "../Components/Admin/AuthList";
import Notices from "../Components/Admin/Notices";
import Authentication from "../Components/Authentication/Authentication";
import NotFound from "../Components/Home/NotFound";
import UserServices from "../Components/Home/UserServices";
import TrainerDashboard from "../Components/Trainer/TrainerDashboard";
import UserDashboard from "../Components/Users/UserDashboard";
import UserNotices from "../Components/Users/UserNotices";
import UserProfile from "../Components/Users/UserProfile";
import Main from "../Layout/Main";
import PrivateRouter from "./PrivateRouter";
import TrainerNotice from "../Components/Trainer/TrainerNotice";
import TrainerViewList from "../Components/Trainer/TrainerViewList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/user-dashboard",
    element: (
      <PrivateRouter>
        <UserDashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "notice",
        element: <UserNotices />,
      },
    ],
  },
  {
    path: "/trainer-dashboard",
    element: (
      <PrivateRouter>
        <TrainerDashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "notice",
        element: <TrainerNotice />,
      },
      {
        path: "view-list",
        element: <TrainerViewList />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRouter>
        <AdminDashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "list",
        element: <AuthList />,
      },
      {
        path: "add-services",
        element: <AddServices />,
      },
      {
        path: "notice",
        element: <Notices />,
      },
    ],
  },
  {
    path: "/user-services/:id",
    element: (
      <PrivateRouter>
        <UserServices />
      </PrivateRouter>
    ),
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
