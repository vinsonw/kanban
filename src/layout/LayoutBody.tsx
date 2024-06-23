import React, { useEffect } from "react";
import SideBar from "./Sidebar";
import "./LayoutBody.scss";
import SidebarToggle from "../components/SidebarToggle/SidebarToggle";
import { BoardContent } from "../components/BoardContent";
import { useIsMobile } from "../hooks";
import { useSidebarExpanded } from "./Layout.hooks";

export const SIDEBAR_TRANSITION_TIME = 100;

const LayoutBody = () => {
  const [sidebarExpanded, setSidebarExpanded] = useSidebarExpanded();
  const [sidebarCollapsedByScreenChange, setSidebarCollapsedByScreenChange] =
    React.useState(false);
  const [displayShowSidebar, setDisplayShowSidebar] = React.useState(true);

  const matchesMobile = useIsMobile();

  useEffect(() => {
    if (matchesMobile && sidebarExpanded) {
      setSidebarExpanded(false);
      setSidebarCollapsedByScreenChange(true);
    }
    if (!matchesMobile && sidebarCollapsedByScreenChange) {
      setSidebarExpanded(true);
      setSidebarCollapsedByScreenChange(false);
    }
  }, [matchesMobile]);

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
      {displayShowSidebar && !matchesMobile && (
        <div className="show-sidebar-wrapper">
          <SidebarToggle.ShowSidebar onClick={() => setSidebarExpanded(true)} />
        </div>
      )}

      <div className="board-wrapper">
        <BoardContent />
      </div>
    </div>
  );
};

export default LayoutBody;
