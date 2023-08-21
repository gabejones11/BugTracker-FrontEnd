import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocalState } from "../utility/UseLocalStorage";
import SearchResultCard from "../components/SearchResultCard";

function IssueSearchModal({ showModal, setShowModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleCloseModal = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowModal(false);
  };

  const handleSearch = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `http://localhost:8080/api/v1/bugs/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("API request failed:", response);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} size="md">
        <Modal.Header closeButton className="form">
          <Modal.Title className="form">Search Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form search-body" style={{ height: "75vh" }}>
          <Form className="form">
            <Form.Group className="mb-3 form" controlId="searchForm">
              <Form.Control
                className="form"
                type="text"
                placeholder="Search an Issue by Summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="search-results">
            {isLoading ? (
              <p>Loading...</p>
            ) : searchResults.length > 0 ? (
              <div className="search-result-list">
                {searchResults.map((result) => (
                  <SearchResultCard key={result.bugId} issue={result} />
                ))}
              </div>
            ) : (
              <p>No matching issues found.</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default IssueSearchModal;
