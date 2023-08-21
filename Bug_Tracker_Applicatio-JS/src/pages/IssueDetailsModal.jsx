import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocalState } from "../utility/UseLocalStorage";
import "../styles/modal.css";

function IssueDetailsModal({ showModal, setShowModal, issue }) {
  const [issueType, setIssueType] = useState(issue.type);
  const [issueSummary, setIssueSummary] = useState(issue.summary);
  const [issueDescription, setIssueDescription] = useState(issue.description);
  const [issueReporter, setIssueReporter] = useState(issue.reportedBy);
  const [issueAssignee, setIssueAssignee] = useState(issue.assignedTo);
  const [issueStatus, setIssueStatus] = useState(issue.status);
  const [issuePriority, setIssuePriority] = useState(issue.priority);
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleCloseModal = () => setShowModal(false);
  const handleIssueTypeChanged = (event) => setIssueType(event.target.value);
  const handleIssueSummaryChanged = (event) =>
    setIssueSummary(event.target.value);
  const handleIssueDescriptionChanged = (event) =>
    setIssueDescription(event.target.value);
  const handleReporterChanged = (event) => setIssueReporter(event.target.value);
  const handleAssigneeChanged = (event) => setIssueAssignee(event.target.value);
  const handleIssueStatusChanged = (event) =>
    setIssueStatus(event.target.value);
  const handleIssuePriorityChanged = (event) =>
    setIssuePriority(event.target.value);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function updateData() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const requestBody = {
      type: issueType,
      summary: issueSummary,
      description: issueDescription,
      reportedBy: issueReporter,
      assignedTo: issueAssignee,
      status: issueStatus,
      priority: issuePriority,
      dateReported: formattedDate,
    };

    fetch(`http://localhost:8080/api/v1/bugs/${issue.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "put",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log("data submitted successfully");
          handleCloseModal();
          window.location.reload();
        } else {
          console.log("error submitting data");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deleteData() {
    fetch(`http://localhost:8080/api/v1/bugs/${issue.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "delete",
    })
      .then((response) => {
        if (response.ok) {
          console.log("data deleted successfully");
          handleCloseModal();
          window.location.reload();
        } else {
          console.log("error deleting data");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="form">
          <Modal.Title className="form">Issue Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form">
          <Form className="form">
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="form">Issue Type</Form.Label>
              <Form.Control
                className="form"
                as="select"
                value={issueType}
                onChange={handleIssueTypeChanged}
              >
                <option value="Task">Task</option>
                <option value="Bug">Bug</option>
                <option value="Story">Story</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="form">Short Summary</Form.Label>
              <Form.Control
                className="form"
                type="text"
                value={issueSummary}
                onChange={handleIssueSummaryChanged}
              />
            </Form.Group>
            <Form.Group className="mb-3 form" controlId="">
              <Form.Label className="form">Description</Form.Label>
              <Form.Control
                className="form"
                as="textarea"
                rows={5}
                value={issueDescription}
                onChange={handleIssueDescriptionChanged}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="form">Reporter</Form.Label>
              <Form.Control
                className="form"
                as="select"
                value={issueReporter}
                onChange={handleReporterChanged}
              >
                <option value="Me">Me</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Assignee</Form.Label>
              <Form.Control
                className="form"
                as="select"
                value={issueAssignee}
                onChange={handleAssigneeChanged}
              >
                <option value="Me">Me</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="form">Status</Form.Label>
              <Form.Control
                className="form"
                as="select"
                value={issueStatus}
                onChange={handleIssueStatusChanged}
              >
                <option value="Backlog">Backlog</option>
                <option value="Selected_For_Development">
                  Selected For Development
                </option>
                <option value="In_Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3 form"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="form">Priority</Form.Label>
              <Form.Control
                className="form"
                as="select"
                value={issuePriority}
                onChange={handleIssuePriorityChanged}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="form">
          <div className="modal-buttons-container">
            <div className="delete-button-container">
              <Button
                variant="secondary"
                onClick={deleteData}
                style={{
                  backgroundColor: "#FF5364",
                  color: "#FFFFFF",
                  outline: "none",
                }}
              >
                Delete
              </Button>
            </div>
            <div className="save-close-buttons-container">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="secondary"
                onClick={updateData}
                style={{
                  backgroundColor: "#FF5364",
                  color: "#FFFFFF",
                  outline: "none",
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default IssueDetailsModal;
