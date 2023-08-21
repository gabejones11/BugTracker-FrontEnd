import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/issue.css";
import IssueDetailsModal from "../pages/IssueDetailsModal";

function Issue({ issue, index }) {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  let issueTypeIconImage = "";
  let issuePriorityIconImage = "";

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
      <Draggable draggableId={`${issue.id}`} key={issue.id} index={index}>
        {(provided, snapshot) => (
          <div
            className="container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={handleOpenModal}
          >
            <div className="issueTitle">{issue.summary}</div>
            <div className="iconContainer">
              <div className="issueIcon">
                <img src={issueTypeIconImage} alt="issue icon" />
              </div>
              <div className="issueIcon">
                <img src={issuePriorityIconImage} alt="issue icon" />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
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

export default Issue;
