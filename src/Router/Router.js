import { createBrowserRouter } from "react-router-dom";
import AddServices from "../Components/Admin/AddServices";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import AuthList from "../Components/Admin/AuthList";
import Notices from "../Components/Admin/Notices";
import Authentication from "../Components/Authentication/Authentication";
import NotFound from "../Components/Home/NotFound";
import TrainerDashboard from "../Components/Trainer/TrainerDashboard";
import UserDashboard from "../Components/Users/UserDashboard";
import Main from "../Layout/Main";
import PrivateRouter from "./PrivateRouter";

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
    children: [{}],
  },
  {
    path: "/trainer-dashboard",
    element: (
      <PrivateRouter>
        <TrainerDashboard />
      </PrivateRouter>
    ),
    children: [{}],
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
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
