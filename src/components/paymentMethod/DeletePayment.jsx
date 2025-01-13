import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import Loader from "../../layouts/layoutcomponents/loader";
import toast from "react-hot-toast";
// import { useAllPaymentsQuery, useDeletePaymentMutation } from "../../redux/features/adminPaymentsEndPoint";

export default function DeletePayment() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    // const [deletePayment, { isLoading: loading }] = useDeletePaymentMutation();
    // const { refetch } = useAllPaymentsQuery();

    const handleDelete = async () => {
        // try {
        //     const res = await deletePayment(data.id);

        //     if (res?.data?.http_status_code === 200) {
        //         refetch();
        //         dispatch(closeModal());
        //         toast.success(res.data.message);
        //     } else {
        //         toast.error(res.data.message);
        //     }
        // } catch (error) {
        //     toast.error(error.message);
        // }
    };

    return (
        <>
            {/* {loading && <Loader />} */}
            <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
                <Modal.Header className="bg-danger">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        Delete Payment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this payment method?</p>
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
