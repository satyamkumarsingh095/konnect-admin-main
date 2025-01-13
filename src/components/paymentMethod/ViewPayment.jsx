import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';

export default function ViewPayment() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light'>
                        View Payment Method
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.name || ''}
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Image</Form.Label>
                            {data?.image ? (
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={data.image}
                                        alt="Payment"
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
                                    />
                                </div>
                            ) : (
                                <p>No image available</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Check
                                type="checkbox"
                                label="Set as Primary"
                                name="isPrimary"
                                checked={data?.isPrimary || false}
                                disabled
                            />
                        </Form.Group>

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
