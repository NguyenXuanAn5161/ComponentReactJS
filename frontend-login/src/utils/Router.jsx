// Đặt các route quản trị trong một nhóm hoặc prefix
export const ADMIN_ROUTES_PREFIX = "/admin"; // để qua bên masterlay nó sẽ kiểm tra xem có này thì ok có sidebar

export const ROUTERS = {
  VISITOR: {
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: process.env.IS_PROD ? "/" : "",
    NOTFOUNDPAGE: "*",
  },
};
