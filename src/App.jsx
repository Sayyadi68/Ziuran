import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchUser } from "./redux/userSlice";
import { HomeLayout, Cart, DashBoard } from "./pages";

function App() {
  const dispatch = useDispatch();

  // لود کردن اطلاعات کاربر هنگام ران شدن اپ
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "cart", element: <Cart /> },
        { path: "account/:page", element: <DashBoard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
