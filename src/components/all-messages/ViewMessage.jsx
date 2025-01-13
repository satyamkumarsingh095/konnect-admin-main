import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { MessageSchema } from '../../commondata/formvalidations';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';
// import { useAllMesssagesQuery, useUpdateMessagesMutation } from '../../redux/features/allMessagesEndPoint';

export default function ViewMessage() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);

    // const [addMessage, { isLoading: loading }] = useUpdateMessagesMutation()

    const initialValues = {
        content: "",
        status: true
    }

    // const { refetch } = useAllMesssagesQuery()
    const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: MessageSchema,
        onSubmit: async (values) => {
            // try {

            //     const resp = await addMessage({ msgId: data?.id, msgBody: values })

            //     if (resp?.data?.http_status_code === 201) {
            //         refetch()
            //         dispatch(closeModal())
            //         toast.success(resp?.data?.content)
            //     } {
            //         toast.error(resp?.data?.content)
            //     }

            // } catch (err) {
            //     toast.error(err.content)
            // }
        },
    });

    useEffect(() => {
        setFieldValue("content", data?.message)
        setFieldValue("status", data?.status)
    }, [data])

    return (
        <>
            {/* {
                loading && <Loader />
            } */}
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light'>
                        View Message
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={handleSubmit}> */}
                    <Form >
                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={values.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="content"
                                className="border border-black rounded-3 w-100"
                                disabled
                            />
                            {errors.content && touched.content ? (
                                <p className='text-danger'>{errors.content}</p>
                            ) : null}
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select name='status' value={values.status} onChange={handleChange} onBlur={handleBlur} disabled>
                                <option value="false">Inactive</option>
                                <option value="true">Active</option>
                            </Form.Select>
                        </Form.Group> */}
                        <Modal.Footer className='mb-0'>
                            {/* <Button type='submit'>
                                Update
                            </Button> */}
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
