import React from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button, } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import PostsDataTable from "../../commondata/postsData";


export default function Posts() {
    return (
        <>
            <Row className="align-items-center">
                <Col> <PageHeader titles="Posts" active="All Posts" items={["Home"]} links={['/dashboard']} /> </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <PostsDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
