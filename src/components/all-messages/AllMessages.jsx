import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import PageHeader from "../../layouts/layoutcomponents/pageheader"
import AllMessagesDataTable from '../../commondata/AllMessagesDataTable'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/allModalSlice'

export default function AllMessages() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className='align-items-center'>
                <Col as={Col} md={6}>
                    <PageHeader titles="All Messages" active="Messages List" items={["Home"]} links={['/dashboard']} />
                </Col>
                <Col as={Col} md={6} className='text-end'>
                    <Button variant='success' onClick={() => { dispatch(openModal({ componentName: "AddMessage" })) }}>Add Message</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <AllMessagesDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}