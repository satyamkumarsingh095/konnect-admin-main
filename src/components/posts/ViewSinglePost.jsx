import React from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function ViewSinglePost() {
    const dispatch = useDispatch();
    const { isOpen, data } = useSelector((state) => state.allCommonModal);
    const images = [];
    // const images = data?.files;
    const totalImages = images ? images.length : 0;
    const [currentSlide, setCurrentSlide] = React.useState(1);

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '300px',
    };

    const handleSlideChange = (previous, next) => {
        setCurrentSlide(next + 1);
    };

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header className="bg-primary">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        View Post
                    </Modal.Title>
                    <Button onClick={() => dispatch(closeModal())} className="btn-close text-light" variant="">
                        <i className="fe fe-x"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Slide onChange={handleSlideChange}>
                            {Array.isArray(images) && images?.length > 0 ? images?.map((slideImage, index) => (
                                <div key={index}>
                                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                                    </div>
                                </div>
                            )) :
                                <div className="text-center mt-3">
                                    No images found.
                                </div>
                            }
                        </Slide>
                        <div className="text-center mt-3">
                            {/* {totalImages > 0 && (
                                <p>{currentSlide}/{totalImages}</p>
                            )} */}
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Content</Form.Label>
                                    <textarea
                                        value={data.content && data.content.length > 0 ? data.content : null}
                                        disabled
                                        className="border border-black rounded-3 w-100"
                                        rows={5}
                                    />
                                </Form.Group>
                                <Row className="mt-4">
                                    <Col as={Col} md={6} className="d-flex align-items-center">
                                        <i className="fa fa-thumbs-up text-primary fs-3 me-2"></i>
                                        <div>
                                            <p className="mb-0 fw-bold">Total Likes</p>
                                            <p className="fs-5 text-muted">{data?.totalLikes ?? 0}</p>
                                        </div>
                                    </Col>
                                    <Col as={Col} md={6} className="d-flex align-items-center">
                                        <i className="fa fa-comment text-primary fs-3 me-2"></i>
                                        <div className="">
                                            <p className="mb-0 fw-bold">Total Comments</p>
                                            <p className="fs-5 text-muted">{data?.totalComments ?? 0}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
