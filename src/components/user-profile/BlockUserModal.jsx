import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/config";

export default function BlockUserModal() {
  const dispatch = useDispatch();
  const { isOpen, data, handleClose, refetch } = useSelector(
    (state) => state.allCommonModal
  );

  const [confirmBlocked, setConfirmBlocked] = useState(false);

  // Handle block confirmation
  const handleBlockConfirmation = async () => {
    setConfirmBlocked(true);
  };

  const handleBlockSubmit = async () => {
    try {
      const selectToken = localStorage.getItem("token");
      const token = selectToken; // Replace with your actual token

      const response = await axios.post(
        `${API_BASE_URL}/block-user`, // Update endpoint for blocking a user
        { user_id: data?.id }, // Pass the user ID to block
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.http_status_code === 200) {
        toast.success(response?.data?.message);
        dispatch(closeModal());
        refetch(); // Re-fetch user data to reflect the change
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error blocking the user.");
      console.error(error);
    }
  };

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header className="bg-danger">
        <Modal.Title
          as="h4"
          className="fw-semibold lh-1 my-auto text-center text-light"
        >
          Block User
        </Modal.Title>
        <Button
          onClick={() => dispatch(closeModal())}
          className="btn-close text-light"
          variant=""
        >
          <i className="fe fe-x"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        {!confirmBlocked ? (
          <div className="text-center">
            <p>
              Are you sure you want to block this user? This action is
              irreversible.
            </p>
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                <Button
                  variant="danger"
                  onClick={handleBlockConfirmation}
                  className="w-100"
                >
                  Block User
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="text-center">
            <p>Are you sure you want to block {data?.username}?</p>
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                <Button
                  variant="danger"
                  onClick={handleBlockSubmit}
                  className="w-100"
                >
                  Yes, Block
                </Button>
              </Col>
              <Col md={6} className="text-center">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmBlocked(false)}
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
