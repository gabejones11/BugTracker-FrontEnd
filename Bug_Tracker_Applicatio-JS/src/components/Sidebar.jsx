import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/sidebar.css";
import "../theme.js";
import { useEffect, useState } from "react";
import { initializeTheme, toggleTheme } from "../theme.js";
import CreateIssueModal from "../pages/CreateIssueModal";
import IssueSearchModal from "../pages/IssueSearchModal";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    initializeTheme();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div
      className="sidebar vh-100 d-flex flex-column justify-content-start position-fixed"
      style={{ width: "75px" }}
    >
      <ul className="nav flex-column text-center">
        <li className="nav-item mb-1 mt-4">
          <img src="./images/bug.png" alt="" style={{ width: "38px" }} />
        </li>
        <li className="nav-item separator">
          <hr className="separator-line mb-5" style={{ color: "gray" }} />
        </li>
        <li className="nav-item mb-5 mt-3">
          <CreateIssueModal />
        </li>
        <li className="nav-item mb-5 mt-3">
          <a className="nav-link" onClick={handleOpenModal}>
            <FontAwesomeIcon className="mr-2" icon={faSearch} />
          </a>
        </li>
        <li className="nav-item mb-5 mt-3" id="themeButton">
          <a className="nav-link" onClick={toggleTheme}>
            <FontAwesomeIcon
              className="mr-2 theme-icon"
              id="darkIcon"
              icon={faMoon}
            />
            <FontAwesomeIcon
              className="mr-2 theme-icon"
              id="lightIcon"
              icon={faSun}
            />
          </a>
        </li>
        <li className="nav-item mb-5 mt-3" id="themeButton">
          <a className="nav-link" onClick={toggleTheme}>
            <FontAwesomeIcon
              className="mr-2"
              icon={faRightFromBracket}
              onClick={handleLogout}
            />
          </a>
        </li>
        <li className="nav-item separator">
          <hr className="separator-line mt-5" style={{ color: "gray" }} />
        </li>
      </ul>
      {showModal && (
        <IssueSearchModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};
export default Sidebar;
