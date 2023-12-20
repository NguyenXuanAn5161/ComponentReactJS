import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={{}}>
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterCustom />
    </Suspense>
  </BrowserRouter>
  // </Provider>
);
