import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalState } from "../utility/UseLocalStorage";
import "../styles/modal.css";

function CreateIssueModal() {
  const [showModal, setShowModal] = useState(false);
  const [issueType, setIssueType] = useState("Task");
  const [issueSummary, setIssueSummary] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueReporter, setIssueReporter] = useState("Me");
  const [issueAssignee, setIssueAssignee] = useState("Me");
  const [issueStatus, setIssueStatus] = useState("Backlog");
  const [issuePriority, setIssuePriority] = useState("Low");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userId, setUserId] = useLocalState("", "userId");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
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

  function submitData() {
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
      createdByUserId: userId,
    };

    fetch(`http://localhost:8080/api/v1/bugs/add?createdByUserId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "post",
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

  return (
    <>
      <a className="nav-link" onClick={handleShowModal}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
      </a>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="form">
          <Modal.Title className="form">Create Issue</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={submitData}
            style={{
              backgroundColor: "#FF5364",
              color: "#FFFFFF",
              outline: "none",
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateIssueModal;
