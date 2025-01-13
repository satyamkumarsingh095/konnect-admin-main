import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import PlanSchemaDataTable from "../../commondata/PlanSchemaDataTable";
import { openModal } from "../../redux/slices/allModalSlice";
// import PagesDataTable from "../../commondata/pagesData";

export default function PlanSchema() {
    const dispatch = useDispatch();

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <PageHeader titles="Membership Plan" active="All Membership Plans" items={["Home"]} links={['/dashboard']} />
                </Col>
                {/* className="text-end d-flex justify-content-end gap-1" */}
                <Col className="text-end d-flex justify-content-end gap-1">
                    <Button className="btn btn-success" variant="" onClick={() => dispatch(openModal({ componentName: 'AddPlan' }))}>
                        Add Membership Plan
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <PlanSchemaDataTable /> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
