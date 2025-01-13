import React from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { AddPageValidation } from "../../commondata/formvalidations";
import { useFormik } from "formik";
// import { useGetAllPagesQuery, useDeletePageMutation } from "../../redux/features/PagesEndPoints";
import Loader from "../../layouts/layoutcomponents/loader";
import toast from "react-hot-toast";

export default function DeletePage() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);
    // const [deletePage, { isLoading: loading }] = useDeletePageMutation();
    // const { refetch } = useGetAllPagesQuery()




    const handleDelete = async () => {
        // try {
        //     const res = await deletePage(data.id)
        //     if (res?.data?.http_status_code === 200) {
        //         dispatch(closeModal());
        //         refetch()
        //         toast.success(res.data.message)
        //     }
        // } catch (error) {
        //     console.error('hh', error);
        //     toast.error(error.message)
        // }
    };

    return (
        <>
            {/* {loading && <Loader />} */}
            <Modal show={isOpen}>
                <Modal.Header className="bg-danger">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        Delete Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this page data?</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button className="border " variant="" onClick={() => dispatch(closeModal())} >
                        Cancel
                    </Button>
                    <Button className="btn btn-danger" variant="danger" onClick={() => handleDelete()} >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
