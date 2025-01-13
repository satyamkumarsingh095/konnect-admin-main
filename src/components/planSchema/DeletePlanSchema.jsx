import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import toast from "react-hot-toast";

export default function DeletePlanSchema() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    const handleDelete = async () => {
        try {
            // Add logic to delete the plan using data.id
            console.log("Plan deleted successfully", data);
            dispatch(closeModal());
            toast.success("Plan deleted successfully");
        } catch (error) {
            console.error("Error deleting plan", error);
            toast.error("Failed to delete plan");
        }
    };

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header className="bg-danger">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        Delete Plan
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this plan?</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button className="border" variant="" onClick={() => dispatch(closeModal())}>
                        Cancel
                    </Button>
                    <Button className="btn btn-danger" variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
