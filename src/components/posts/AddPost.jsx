import React, { useState } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { closeModal } from "../../redux/slices/allModalSlice";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import toast from "react-hot-toast";
import { API_USER_URL } from "../../utils/config";
// import { useGetAllPostsQuery } from "../../redux/features/PostsEndPoints";


export default function AddPost() {
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryParams, setQueryParams] = useState({
    user_name: '',
    fromDate: '',
    toDate: '',
    status: ''
  });


  // const { refetch } = useGetAllPostsQuery(queryParams);



  const initialValues = {
    files: "",
    content: "",
  };

  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.allCommonModal);
  //   const images = data?.files;
  //   const totalImages = images ? images.length : 0;
  const [currentSlide, setCurrentSlide] = React.useState(1);

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "300px",
  };

  const handleSlideChange = (previous, next) => {
    setCurrentSlide(next + 1);
  };

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,

      validationSchema: "",
      onSubmit: async (value) => {
        try {
          const selectToken = localStorage.getItem("token");
          const token = selectToken;

          const formData = new FormData();
          formData.append("content", value.content);
          for (let i = 0; i < value.files.length; i++) {
            formData.append("files", value.files[i]);
          }


          const adduser = await axios.post(`${API_USER_URL}add-post`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          const response = adduser.data;

          if (response?.http_status_code === 201) {
            toast.success(response?.message);
            // resetForm();
            // handleClose();
            dispatch(closeModal());
            refetch();
            // window.location.reload();
          } else {
            toast.error(response);
          }
        } catch (error) {
          const errors = error?.response?.data?.data?.errors;
          if (Array.isArray(errors)) {
            errors.forEach((err) => {
              toast.error(err.message);
            });
          } else {
            toast.error(error?.response?.data?.message);
          }
        }
      },
    });

  return (
    <>
      <Modal show={isOpen} onSubmit={handleSubmit}>
        <Modal.Header className="bg-primary">
          <Modal.Title
            as="h4"
            className="fw-semibold lh-1 my-auto text-center text-light"
          >
            Add Post
          </Modal.Title>
          <Button
            onClick={() => dispatch(closeModal())}
            className="btn-close text-light"
            variant=""
          >
            <i className="fe fe-x"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    File <span className="text-danger">*</span>
                  </Form.Label>
                  <input
                    type="file"
                    name="files"
                    onChange={(event) =>
                      setFieldValue("files", event.currentTarget.files)
                    }
                    multiple
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <textarea
                      className="border border-black rounded-3 w-100"
                      rows={5}
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="content"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col as={Col} className="text-center mt-5">
                <Button type="submit">Save</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
