
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivetRoute from "./PrivetRoute";
import MyTransaction from "../Pages/MyTransaction";
import AddTransaction from "../Pages/AddTransaction";

export const router = createBrowserRouter([
  {
    path:"/",
    Component:Root,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"/auth/login",
        Component:Login
      },
      {
        path:"/auth/register",
        Component:Register
      },
      {
        path:"/my-transaction",
        element:<PrivetRoute>
          <MyTransaction></MyTransaction>
        </PrivetRoute>
      },
      {
        path:"/add-transaction",
        element:<PrivetRoute>
          <AddTransaction></AddTransaction>
        </PrivetRoute>
      }
    ]
  }
])