import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';

export default function ViewTransaction() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    return (
        <>
            <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title className='text-light'>
                        View Transaction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.date || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.description || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.amount || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.transactionType || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.status || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        {/* <Form.Group className="mt-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="type"
                                className="border border-black rounded-3 w-100"
                            >
                                <option value="">Select Type</option>
                                <option value="Credit">Credit</option>
                                <option value="Debit">Debit</option>
                            </Form.Select>
                            {errors.type && touched.type ? (
                                <p className='text-danger'>{errors.type}</p>
                            ) : null}
                        </Form.Group> */}

                        <Modal.Footer className='mb-0'>
                            <Button variant='secondary' onClick={() => dispatch(closeModal())}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
