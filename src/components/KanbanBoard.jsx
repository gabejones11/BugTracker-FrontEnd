import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import IssueContainer from "./IssueContainer";
import { useLocalState } from "../utility/UseLocalStorage";

function KanbanBoard() {
  const [backlog, setBacklog] = useState([]);
  const [selectedForDev, setSelectedForDev] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userId, setUserId] = useLocalState("", "userId");

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/bugs/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => response.json())
      .then((bugs) => {
        setBacklog(bugs.filter((issue) => issue.status === "Backlog"));
        setSelectedForDev(
          bugs.filter((issue) => issue.status === "Selected_For_Development")
        );
        setInProgress(bugs.filter((issue) => issue.status === "In_Progress"));
        setDone(bugs.filter((issue) => issue.status === "Done"));
      });
  }, []);

  const updateIssueStatus = (issueId, status) => {
    fetch(`http://localhost:8080/api/v1/bugs/update/status/${issueId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((updatedIssue) => {
        console.log("Issue status updated:", updatedIssue);
      })
      .catch((error) => {
        console.error("Error updating issue status:", error);
      });
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    function removeItemById(id, array) {
      return array.filter((item) => item.id != id);
    }

    function findItemById(id, array) {
      return array.find((item) => item.id == id);
    }

    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    switch (source.droppableId) {
      case "1":
        setBacklog(removeItemById(draggableId, backlog));
        break;
      case "2":
        setSelectedForDev(removeItemById(draggableId, selectedForDev));
        break;
      case "3":
        setInProgress(removeItemById(draggableId, inProgress));
        break;
      case "4":
        setDone(removeItemById(draggableId, done));
        break;
      default:
        break;
    }

    const issue = findItemById(draggableId, [
      ...backlog,
      ...selectedForDev,
      ...inProgress,
      ...done,
    ]);

    switch (destination.droppableId) {
      case "1":
        setBacklog([{ ...issue, status: "Backlog" }, ...backlog]);
        updateIssueStatus(issue.id, "Backlog");
        break;
      case "2":
        setSelectedForDev([
          { ...issue, status: "Selected_For_Development" },
          ...selectedForDev,
        ]);
        updateIssueStatus(issue.id, "Selected_For_Development");
        break;
      case "3":
        setInProgress([{ ...issue, status: "In_Progress" }, ...inProgress]);
        updateIssueStatus(issue.id, "In_Progress");
        break;
      case "4":
        setDone([{ ...issue, status: "Done" }, ...done]);
        updateIssueStatus(issue.id, "Done");
        break;
      default:
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2
        style={{
          textAlign: "center",
          paddingTop: "15px",
        }}
      >
        Progress Board
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <IssueContainer
          title={"BACKLOG"}
          issues={backlog}
          id={"1"}
        ></IssueContainer>
        <IssueContainer
          title={"SELECTED FOR DEVELOPMENT"}
          issues={selectedForDev}
          id={"2"}
        ></IssueContainer>
        <IssueContainer
          title={"IN PROGRESS"}
          issues={inProgress}
          id={"3"}
        ></IssueContainer>
        <IssueContainer title={"DONE"} issues={done} id={"4"}></IssueContainer>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
