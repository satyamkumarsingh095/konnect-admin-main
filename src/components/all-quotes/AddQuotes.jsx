import { useFormik } from 'formik'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { MessageSchema, QuotesSchema } from '../../commondata/formvalidations';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';
// import { useAddQuotesMutation, useAllQuotesQuery } from '../../redux/features/adminQuotesEndPoint';

export default function AddQuotes() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.allCommonModal);
    // const [addMessage, { isLoading: loading }] = useAddQuotesMutation()

    const initialValues = {
        content: "",
        status: true
    }
    // const { refetch } = useAllQuotesQuery()
    const { errors, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: QuotesSchema,
        onSubmit: async (values) => {
            // try {

            //     const resp = await addMessage(values)

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

    return (
        <>
            {/* {
                loading && <Loader />
            } */}
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light'>
                        Add Quotes
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                            />
                            {errors.content && touched.content ? (
                                <p className='text-danger'>{errors.content}</p>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select name='' value={values.status} onChange={handleChange} onBlur={handleBlur}>
                                <option value="false">Inactive</option>
                                <option value="true">Active</option>
                            </Form.Select>
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
