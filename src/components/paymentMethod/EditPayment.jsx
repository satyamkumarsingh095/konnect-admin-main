import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { AddPaymentValidation } from '../../commondata/formvalidations';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';
// import { useAllPaymentsQuery, useUpdatePaymentMutation } from '../../redux/features/adminPaymentsEndPoint';

export default function EditPayment() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    // const [updatePayment, { isLoading: loading }] = useUpdatePaymentMutation();

    const initialValues = {
        name: "",
        image: null,
        isPrimary: false
    };

    // const { refetch } = useAllPaymentsQuery();
    const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPaymentValidation,
        onSubmit: async (values) => {
            // try {

            //     const resp = await updatePayment({ paymentId: data?.id, paymentBody: values });

            //     if (resp?.data?.http_status_code === 200) {
            //         refetch();
            //         dispatch(closeModal());
            //         toast.success(resp?.data?.message);
            //     } else {
            //         toast.error(resp?.data?.message);
            //     }

            // } catch (err) {
            //     toast.error(err.message);
            // }
        },
    });

    useEffect(() => {
        setFieldValue("name", data?.name);
        setFieldValue("isPrimary", data?.isPrimary);
        // Assume `image` is not pre-populated due to file type constraints.
    }, [data]);

    return (
        <>
            {/* {
                loading && <Loader />
            } */}
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light'>
                        Edit Payment Method
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="name"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.name && touched.name ? (
                                <p className='text-danger'>{errors.name}</p>
                            ) : null}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                                onBlur={handleBlur}
                                name="image"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.image && touched.image ? (
                                <p className='text-danger'>{errors.image}</p>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Check
                                type="checkbox"
                                label="Set as Primary"
                                name="isPrimary"
                                checked={values.isPrimary}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>

                        <Modal.Footer className='mb-0'>
                            <Button type='submit'>
                                Update
                            </Button>
                            <Button variant='secondary' onClick={() => dispatch(closeModal())}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
