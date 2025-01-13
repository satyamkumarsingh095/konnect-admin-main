import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import PageHeader from '../../layouts/layoutcomponents/pageheader';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/allModalSlice';
import UserTransactionTable from '../../commondata/UserTransactionTable';

export default function PaymentHistory() {
    const dispatch = useDispatch();

    return (
        <>
            <Row className='align-items-center'>
                <Col md={6}>
                    <PageHeader 
                        titles="Payment History" 
                        active="Transaction Records" 
                        items={["Home"]} 
                        links={['/dashboard']} 
                    />
                </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                    {/* <Button 
                        className="btn btn-primary" 
                        onClick={() => { dispatch(openModal({ componentName: "FilterTransactions" })); }}
                    >
                        Filter Records
                    </Button> */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <UserTransactionTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
