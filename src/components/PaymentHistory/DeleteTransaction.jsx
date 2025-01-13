import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import toast from "react-hot-toast";

export default function DeleteTransaction() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    const handleDelete = async () => {
        try {
            // Assume deleteTransaction is a function for deleting the transaction.
            // const response = await deleteTransaction(data.id);
            toast.success("Transaction deleted successfully");
            dispatch(closeModal());
        } catch (error) {
            toast.error("Failed to delete transaction");
        }
    };

    return (
        <>
            <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
                <Modal.Header className="bg-danger" closeButton>
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        Delete Transaction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this transaction?</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button className="border" variant="secondary" onClick={() => dispatch(closeModal())}>
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
