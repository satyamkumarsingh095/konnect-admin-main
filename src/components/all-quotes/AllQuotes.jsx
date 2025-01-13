import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import PageHeader from "../../layouts/layoutcomponents/pageheader"
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/allModalSlice'
import AllQuotesDataTable from '../../commondata/AllQuotesDataTable'

export default function AllQuotes() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className='align-items-center'>
                <Col as={Col} md={6}>
                    <PageHeader titles="All Quotes" active="Quotes List" items={["Home"]} links={['/dashboard']} />
                </Col>
                <Col as={Col} md={6} className='text-end'>
                    <Button variant='success' onClick={() => { dispatch(openModal({ componentName: "AddQuotes" })) }}>Add Message</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <AllQuotesDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}