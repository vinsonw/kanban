import LayoutHeader from "./LayoutHeader";
import LayoutBody from "./LayoutBody";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout__header">
        <LayoutHeader />
      </div>
      <div className="layout__body">
        <LayoutBody />
      </div>
    </div>
  );
};

export default Layout;
