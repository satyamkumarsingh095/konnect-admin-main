import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Tabs, Tab, Card, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
// import { useGetUserProfileQuery } from "../../redux/features/commonApiCall";
import Loader from "../../layouts/layoutcomponents/loader";
import Error from "../../layouts/layoutcomponents/Error";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";
import { components } from "react-select";
import { API_BASE_URL } from '../../utils/config';
// import { useGetAdminProfileQuery } from "../../redux/features/AuthenticationEndPoints";

export default function UserProfile() {
  // const [data, setData] = useState(null);
  const dispatch = useDispatch();

  // const { data: profile_data, isLoading, isSuccess } = useGetAdminProfileQuery()

  // setData(profile_data?.data)


  return (
    <>
      {
        isLoading && <Loader />
      }
      <div>
        <PageHeader
          titles="Profile"
          active="Profile"
          links={["/"]}
          items={["Home"]}
        />
        <Row id="user-profile">
          <Col lg={12}>
            <Card className=" bg-transparent shadow-none border-0">
              <Card.Body className=" bg-white">
                <div className="wideget-user">
                  <Row>
                    <Col lg={12} md={12} xl={6}>
                      <div className="wideget-user-desc d-sm-flex">
                        <div className="wideget-user-img">
                          <img
                            className=""
                            src={`${profile_data?.data?.profile_pic || one}`}
                            alt="img"
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="user-wrap">
                          <h4>
                            {/* {profile_data?.data?.first_name} {profile_data?.data?.last_name} */}
                            one

                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} md={12} xl={6}>
                      <div className="text-xl-right mt-4 mt-xl-0">
                        <Link to={`#`} className="btn btn-primary me-1" onClick={() => { dispatch(openModal({ componentName: 'EditModal', data: profile_data.data })) }}>
                          Edit Profile
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
              <div className="border-top ">
                <div className="wideget-user-tab">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu1 profiletabs">
                      <Tabs
                        variant="Tabs"
                        defaultActiveKey="Profile"
                        id=" tab-51"
                        className="tab-content tabesbody "
                      >
                        <Tab eventKey="Profile" title="Profile">
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              <Card>
                                <Card.Body className="bg-white">
                                  <div className="media-heading">
                                    <h5>
                                      <strong>Personal Information</strong>
                                    </h5>
                                  </div>
                                  <div className="table-responsive p-1">
                                    <Table className="table row table-borderless">
                                      <tbody className="col-lg-12 col-xl-6 p-0">
                                        <tr>
                                          <td>
                                            <strong>Full Name:</strong>{" "}
                                            {profile_data?.data?.first_name}{" "}
                                            {profile_data?.data?.last_name}{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>Phone:</strong>{" "}
                                            {profile_data?.data?.phone}
                                          </td>
                                        </tr>
                                      </tbody>
                                      <tbody className="col-lg-12 col-xl-6 p-0">
                                        <tr>
                                          <td>
                                            <strong>Email:</strong>{" "}
                                            {profile_data?.data?.email}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>D.O.B:</strong>{" "}
                                            {profile_data?.data?.dob}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}
