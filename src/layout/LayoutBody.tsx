import React from "react";
import SideBar from "./Sidebar";
import "./LayoutBody.scss";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";

const LayoutBody = () => {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  return (
    <div className="layout-body">
      <div
        className="sidebar-wrapper"
        style={{ width: sidebarExpanded ? "" : "0px" }}
      >
        <SideBar onHideSideBar={() => setSidebarExpanded(false)} />
      </div>
      {/* fixed position */}
      {!sidebarExpanded && (
        <div className="show-sidebar-wrapper">
          <SidebarToggle.ShowSidebar onClick={() => setSidebarExpanded(true)} />
        </div>
      )}

      <div className="board-wrapper"></div>
    </div>
  );
};

export default LayoutBody;
