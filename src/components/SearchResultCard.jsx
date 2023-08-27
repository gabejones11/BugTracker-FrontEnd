import React, { useState } from "react";
import "../styles/search-result-card.css";
import IssueDetailsModal from "../pages/IssueDetailsModal";

function SearchResultCard({ issue, handleOpenModal }) {
  let issueTypeIconImage = "";
  let issuePriorityIconImage = "";

  const [showModal, setShowModal] = useState(false);
  const handleOpenDetailsModal = () => {
    setShowModal(true);
  };

  switch (issue.type) {
    case "Bug":
      issueTypeIconImage = "./images/bug_icon.svg";
      break;
    case "Story":
      issueTypeIconImage = "./images/story_icon.svg";
      break;
    case "Task":
      issueTypeIconImage = "./images/task_icon.svg";
      break;
    default:
      issueTypeIconImage = "./images/bug_icon.svg";
  }

  switch (issue.priority) {
    case "High":
      issuePriorityIconImage = "./images/high_priority_icon.svg";
      break;
    case "Medium":
      issuePriorityIconImage = "./images/medium_priority_icon.svg";
      break;
    case "Low":
      issuePriorityIconImage = "./images/low_priority_icon.svg";
      break;
    default:
      issuePriorityIconImage = "./images/low_priority_icon.svg";
  }

  return (
    <>
      <div className="search-result-card" onClick={handleOpenDetailsModal}>
        <div className="issueTitle">{issue.summary}</div>
        <div className="iconContainer">
          <div className="issueIcon">
            <img src={issueTypeIconImage} alt="issue icon" />
          </div>
          <div className="issueIcon">
            <img src={issuePriorityIconImage} alt="issue icon" />
          </div>
        </div>
      </div>
      {showModal && (
        <IssueDetailsModal
          showModal={showModal}
          setShowModal={setShowModal}
          issue={issue}
        />
      )}
    </>
  );
}

export default SearchResultCard;
