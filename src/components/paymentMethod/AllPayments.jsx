import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import PageHeader from "../../layouts/layoutcomponents/pageheader"
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/allModalSlice'
import AllPaymentsDataTable from '../../commondata/AllPaymentsDataTable'
// import AddPayment from './AddPayment'

export default function AllPayments() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className='align-items-center'>
                <Col as={Col} md={6}>
                    <PageHeader titles="All Payment Method" active="Payments List" items={["Home"]} links={['/dashboard']} />
                </Col>
                {/* as={Col} md={6} className='text-end' */}
                <Col className="text-end d-flex justify-content-end gap-1">
                    <Button className="btn btn-success" variant='' onClick={() => { dispatch(openModal({ componentName: "AddPayment" })) }}>Add Payment Method</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <AllPaymentsDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
