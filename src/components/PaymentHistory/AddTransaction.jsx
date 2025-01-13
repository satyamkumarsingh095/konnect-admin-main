import { useFormik } from 'formik';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { AddTransactionValidation } from '../../commondata/formvalidations';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';

export default function AddTransaction() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.allCommonModal);

    const initialValues = {
        description: "",
        amount: "",
        date: "",
        isRecurring: false
    };

    const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddTransactionValidation,
        onSubmit: async (values) => {
            try {
                // Assume addTransaction is a function for adding a transaction.
                // const response = await addTransaction(values);
                toast.success("Transaction added successfully");
                dispatch(closeModal());
            } catch (err) {
                toast.error("Failed to add transaction");
            }
        },
    });

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light'>
                        Add Transaction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
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

                        <Form.Group>
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

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
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
                            <Form.Check
                                type="checkbox"
                                label="Recurring Transaction"
                                name="isRecurring"
                                checked={values.isRecurring}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>

                        <Modal.Footer className='mb-0'>
                            <Button type='submit'>
                                Save
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
