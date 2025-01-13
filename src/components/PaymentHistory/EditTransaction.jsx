import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export default function EditTransaction() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    const TransactionValidation = Yup.object().shape({
        date: Yup.string().required('Date is required'),
        description: Yup.string().required('Description is required'),
        amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
        status: Yup.string().required('Status is required'),
    });

    const initialValues = {
        date: '',
        description: '',
        amount: '',
        status: '',
    };

    const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: TransactionValidation,
        onSubmit: async (values) => {
            try {
                // Assume updateTransaction is a function for updating the transaction.
                // const response = await updateTransaction(data?.id, values);
                toast.success('Transaction updated successfully');
                dispatch(closeModal());
            } catch (err) {
                toast.error('Failed to update transaction');
            }
        },
    });

    useEffect(() => {
        setFieldValue('date', data?.date || '');
        setFieldValue('description', data?.description || '');
        setFieldValue('amount', data?.amount || '');
        setFieldValue('status', data?.status || '');
    }, [data]);

    return (
        <>
            <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-light'>
                        Edit Transaction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="date"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.date && touched.date ? (
                                <p className='text-danger'>{errors.date}</p>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="description"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.description && touched.description ? (
                                <p className='text-danger'>{errors.description}</p>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="amount"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.amount && touched.amount ? (
                                <p className='text-danger'>{errors.amount}</p>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="status"
                                className="border border-black rounded-3 w-100"
                            />
                            {errors.status && touched.status ? (
                                <p className='text-danger'>{errors.status}</p>
                            ) : null}
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
