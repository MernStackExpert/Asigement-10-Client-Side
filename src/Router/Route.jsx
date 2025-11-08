
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Register from "../Pages/Auth/Register";

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
        path:"/register",
        Component:Register
      }
    ]
  }
])