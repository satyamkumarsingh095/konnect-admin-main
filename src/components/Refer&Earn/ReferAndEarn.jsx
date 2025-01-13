import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import img from "../../assets/images/media/OIP.jpg";

export default function ReferAndEarn() {
  const referralCode = "AYUXH21XA";
  const earnedReward = 50; // Example value
  const referredFriends = 15; // Example value

  // Function to handle copying the referral code
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  return (
    <div className="refer-and-earn-page">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4">
            <Row>
              <Col md={6} className="text-center">
              <h5>You Get</h5>
                <img
                  src={img}
                  alt="You Get Reward"
                  className="mb-3"
                />
                <p className="mb-1">
                  <strong>$50 Reward</strong>
                </p>
                <p>On your friend's 1st sign up</p>
              </Col>
              <Col md={6} className="text-center">
              <h5>Friends Get</h5>
              <br/>
                <img
                  src="https://th.bing.com/th/id/OIP.0KuvoKV4aoroVGPWEEqUrAHaEX?rs=1&pid=ImgDetMain"
                  alt="Friends Get Reward"
                  className="mb-3"
                />
                <br/>
                <p className="mb-1">
                  <strong>$50 Reward</strong>
                </p>
                <p>When they sign up</p>
              </Col>
            </Row>
            <hr />
            <div className="text-center my-3">
              <h6>Invite Code</h6>
              <p>Share the code and give your friends. Let's make Konnections together! 💪</p>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Form.Control
                  type="text"
                  value={referralCode}
                  readOnly
                  className="text-center border-warning bg-light w-50"
                  style={{ cursor: "pointer" }}
                  onClick={copyToClipboard}
                />
                <Button
                  variant="outline-warning"
                  onClick={copyToClipboard}
                  className="ms-2"
                >
                  <FaCopy />
                </Button>
              </div>
            </div>
            <Row>
              <Col md={6} className="text-center">
                <Card className="p-3 bg-light">
                  <h6>$ {earnedReward} Reward</h6>
                  <p>You earned through referral</p>
                </Card>
              </Col>
              <Col md={6} className="text-center">
                <Card className="p-3 bg-light">
                  <h6>{referredFriends}</h6>
                  <p>Friends you referred</p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
