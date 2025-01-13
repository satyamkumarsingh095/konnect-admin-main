import React from "react";
import CountUp from "react-countup";
import { Col, Row, Card } from "react-bootstrap";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import Loader from "../../layouts/layoutcomponents/loader";
import { Link } from "react-router-dom";
// import { useDasboardDataQuery } from "../../redux/features/adminQuotesEndPoint";

export default function Dashboard() {


  return (
    <div>
      <PageHeader titles="Dashboard" active="Dashboard" items={["Home"]} />
      <Row>
        {/* {cardData.map((item, index) => ( */}
        <Col lg={4} md={6} sm={12} >
          {/* <Link to={item.link}> */}
          <Card className="overflow-hidden">
            <Card.Body className="card-body">
              <Row>
                <div className="col">
                  <h6>Customer</h6>
                  <h3 className="mb-2 number-font">
                    <CountUp end={500} separator="," start={0} duration={2.5} />
                  </h3>
                </div>
                <div className="col col-auto">
                  <div className={`counter-icon bg-danger-gradient box-shadow-danger brround ms-auto`}>
                    <i className={`fe fe-dollar-sign text-white mb-5`}></i>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </Col>
        <Col lg={4} md={6} sm={12} >
          {/* <Link to={item.link}> */}
          <Card className="overflow-hidden">
            <Card.Body className="card-body">
              <Row>
                <div className="col">
                  <h6>Order</h6>
                  <h3 className="mb-2 number-font">
                    <CountUp end={500} separator="," start={0} duration={2.5} />
                  </h3>
                </div>
                <div className="col col-auto">
                  <div className={`counter-icon bg-danger-gradient box-shadow-danger brround ms-auto`}>
                    <i className={`fe fe-dollar-sign text-white mb-5`}></i>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </Col>
        <Col lg={4} md={6} sm={12} >
          {/* <Link to={item.link}> */}
          <Card className="overflow-hidden">
            <Card.Body className="card-body">
              <Row>
                <div className="col">
                  <h6>Income</h6>
                  <h3 className="mb-2 number-font">
                    <CountUp end={500} separator="," start={0} duration={2.5} />
                  </h3>
                </div>
                <div className="col col-auto">
                  <div className={`counter-icon bg-danger-gradient box-shadow-danger brround ms-auto`}>
                    <i className={`fe fe-dollar-sign text-white mb-5`}></i>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </Col>
        {/* ))} */}
      </Row>
    </div>
  );
}
