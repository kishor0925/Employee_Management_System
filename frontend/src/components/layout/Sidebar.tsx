import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useState } from "react";
import "../../styles/Sidebar.css";
import {
  LuLayoutDashboard,
  LuUser,
  LuUsers,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";

function Sidebar() {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <LuUser />,
    },
    {
      name: "Noventra Family",
      path: "/companymembers",
      icon: <LuUsers />,
    },
    {
      name: "Logout",
      path: "/",
      icon: <LuLogOut />,
    },
  ];

  return (
    <aside className={`sidebar ${collapse ? "sidebar-collapse" : ""}`}>
      <div className="sidebar-header">
        {collapse === false && <h2 className="sidebar-logo">Noventra</h2>}

        <Button
          className="sidebar-toggle"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse === true ? <LuMenu /> : <LuX />}
        </Button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li className="sidebar-item" key={item.path}>
              <Button
                className="sidebar-button"
                onClick={() => navigate(item.path)}
              >
                <span className="sidebar-icon">{item.icon}</span>

                {collapse === false && (
                  <span className="sidebar-name">{item.name}</span>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>    
  );
}

export default Sidebar;
