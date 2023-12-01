import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/theme/login/Login.jsx";
import MasterLayout from "./pages/theme/masterLayout/MasterLayout";
import Register from "./pages/theme/register/Register.jsx";
import HomePage from "./pages/user/homepage/HomePage.jsx";
import NotFoundPage from "./pages/user/notFoundPage/NotFoundPage.jsx";
import { ROUTERS } from "./utils/Router.jsx";

const RenderUserRouter = () => {
  // const visitorRoutes = [
  //   {
  //     path: ROUTERS.VISITOR.LOGIN,
  //     component: lazy(() => import("./pages/theme/login/Login")),
  //   },
  //   {
  //     path: ROUTERS.VISITOR.HOME,
  //     component: lazy(() => import("./pages/user/homepage/HomePage")),
  //   },
  //   {
  //     path: ROUTERS.VISITOR.REGISTER,
  //     component: lazy(() => import("./pages/theme/register/Register")),
  //   },
  //   {
  //     path: ROUTERS.VISITOR.NOTFOUNDPAGE,
  //     component: lazy(() =>
  //       import("./pages/user/notFoundPage/NotFoundPage.jsx")
  //     ),
  //   },
  // ];

  const visitorRoutes = [
    {
      path: ROUTERS.VISITOR.LOGIN,
      component: <Login />,
    },
    {
      path: ROUTERS.VISITOR.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.VISITOR.REGISTER,
      component: <Register />,
    },
    {
      path: ROUTERS.VISITOR.NOTFOUNDPAGE,
      component: <NotFoundPage />,
    },
  ];
  return (
    <MasterLayout>
      <Routes>
        {visitorRoutes.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
        ;
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  console.log("RouterCustom");
  return RenderUserRouter();
};

export default memo(RouterCustom);
