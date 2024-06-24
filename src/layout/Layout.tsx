import LayoutHeader from "./LayoutHeader";
import LayoutBody from "./LayoutBody";
import "./Layout.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { clearDb, initDB } from "../utils";
import { useEffect } from "react";
import { ROOT_PATH } from "../constants";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    clearDb();
    initDB();
    navigate(ROOT_PATH);
  }, []);
  return null;
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/clear" element={<Redirect />} />
      <Route
        path="*"
        element={
          <div className="layout">
            <LayoutHeader />
            <LayoutBody />
          </div>
        }
      />
    </Routes>
  );
};

export default Layout;
