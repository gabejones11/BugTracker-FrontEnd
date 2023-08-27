import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "../styles/scroll.css";
import Issue from "./Issue";
import "../styles/issueContainer.css";

function IssueContainer({ title, issues, id }) {
  return (
    <div className="issueContainer">
      <div className="issueContainerTitle">{title}</div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              className="issueContainerBody"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {issues.map((issue, index) => (
                <Issue key={issue.id} issue={issue} index={index}></Issue>
              ))}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default IssueContainer;
