import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { useFormik } from "formik";
import Loader from "../../layouts/layoutcomponents/loader";

export default function EditModal() {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const { isOpen, handleClose, refetch } = useSelector((state) => state.allCommonModal);

  const initialValues = {
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    dob: data?.dob || "",
    profile_pic: null,
    country_code: data?.country_code || "+91",
  };

  // const { refetch: refetchAdminProfile } = useGetAdminProfileQuery()

  const { values, handleBlur, handleChange, handleSubmit, resetForm, setValues, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (value) => {
      // setLoading(true)

      // try {
      //   const selectToken = localStorage.getItem("token");
      //   const token = selectToken;
      //   const formData = new FormData();
      //   Object.keys(value).forEach(key => {
      //     formData.append(key, value[key]);
      //   });

      //   const response = await axios.put(`${API_BASE_URL}/update-profile`, formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   if (response?.data?.http_status_code === 200) {
      //     toast.success(response?.data?.message);
      //     refetchAdminProfile()
      //     setLoading(false)
      //     dispatch(closeModal());
      //   } else {
      //     console.error('Unexpected response', response);
      //   }

      // } catch (error) {
      //   console.error(error);
      // }
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setValues({
  //       first_name: data?.first_name,
  //       last_name: data?.last_name,
  //       email: data?.email,
  //       phone: data?.phone,
  //       dob: data?.dob && !isNaN(new Date(data?.dob))
  //         ? new Date(data?.dob).toISOString().split("T")[0]
  //         : "",
  //       profile_pic: data.data?.profile_pic,
  //       country_code: data.data?.country_code || "+91",
  //     });
  //   }
  // }, [data, setValues]);

  return (
    <>
      {/* {
        loading && <Loader />
      } */}
      <Modal show={isOpen} onSubmit={handleSubmit}>
        <Modal.Header className="bg-primary">
          <Modal.Title
            as="h4"
            className="fw-semibold lh-1 my-auto text-center text-light"
          >
            Edit Profile
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
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Phone Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    DOB <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Profile Pic <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="profile_pic"
                    className="border border-black rounded-3 w-100"
                    accept="image/jpeg, image/png, image/jpg, image/webp"
                    onChange={(event) => setFieldValue("profile_pic", event.currentTarget.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Country Code <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="country_code"
                    value={values.country_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
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
