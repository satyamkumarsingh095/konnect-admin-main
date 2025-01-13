import React from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import PagesDataTable from "../../commondata/pagesData";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";
import { components } from "react-select";


export default function Pages() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className="align-items-center">
                <Col> <PageHeader titles="Pages" active="All Pages" items={["Home"]} links={['/dashboard']} /> </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                    <Link to={"/add-page"}  >
                        <Button className="btn btn-success" variant="" onClick={() => dispatch(openModal({ componentName: '' }))}>Add New Page</Button>
                    </Link>
                </Col>
            </Row >
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <PagesDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
