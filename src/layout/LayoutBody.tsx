import React, { useEffect } from "react";
import SideBar from "./Sidebar";
import "./LayoutBody.scss";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";

export const SIDEBAR_TRANSITION_TIME = 100;

const LayoutBody = () => {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  const [displayShowSidebar, setDisplayShowSidebar] = React.useState(true);
  useEffect(() => {
    if (!sidebarExpanded) {
      setTimeout(() => setDisplayShowSidebar(true), SIDEBAR_TRANSITION_TIME);
      return;
    }
    setDisplayShowSidebar(false);
  }, [sidebarExpanded]);
  return (
    <div
      className="layout-body"
      style={
        {
          "--sidebar-transition-time": SIDEBAR_TRANSITION_TIME + "ms",
        } as React.CSSProperties
      }
    >
      <div
        className="sidebar-wrapper"
        style={{ width: sidebarExpanded ? "" : "0px" }}
      >
        <SideBar onHideSideBar={() => setSidebarExpanded(false)} />
      </div>
      {/* fixed position */}
      {displayShowSidebar && (
        <div className="show-sidebar-wrapper">
          <SidebarToggle.ShowSidebar onClick={() => setSidebarExpanded(true)} />
        </div>
      )}

      <div className="board-wrapper"></div>
    </div>
  );
};

export default LayoutBody;
