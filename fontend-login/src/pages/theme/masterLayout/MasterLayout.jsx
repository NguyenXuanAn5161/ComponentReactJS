import { memo } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
