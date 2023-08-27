import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../theme.js";
import { initializeTheme } from "../theme";
import KanbanBoard from "../components/KanbanBoard";

function Dashboard() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className={localStorage.getItem("theme")}>
      <div>
        <SideBar />
      </div>
      <div className="dashboard-content vh-100">
        <KanbanBoard />
      </div>
    </div>
  );
}

export default Dashboard;
