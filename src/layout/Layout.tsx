import LayoutHeader from "./LayoutHeader";
import LayoutBody from "./LayoutBody";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <LayoutHeader />
      <LayoutBody />
    </div>
  );
};

export default Layout;
