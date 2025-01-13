import React, { useState } from "react";
import { Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/allModalSlice";

export default function UserTransactionTable() {
    const [serialNumber, setSerialNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const data = [
        {
            id: 1,
            date: "2025-01-01",
            description: "Purchase",
            amount: "$50.00",
            status: "Completed",
            transactionType: "Debit", 
        },
        {
            id: 2,
            date: "2025-01-05",
            description: "Subscription",
            amount: "$10.00",
            status: "Pending",
            transactionType: "Credit"
        },
    ];

    const COLUMNS = [
        {
            name: "#",
            selector: (row, index) => index + serialNumber,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
            sortable: true,
        },
        {
            name: "Transaction Type", // New column
            selector: (row) => row.transactionType,
            // cell: (row) => (
            // <Form.Group className="mt-3">
            //                 <Form.Label>Type</Form.Label>
            //                 <Form.Select
            //                     value={values.type}
            //                     onChange={handleChange}
            //                     onBlur={handleBlur}
            //                     name="type"
            //                     className="border border-black rounded-3 w-100"
            //                 >
            //                     <option value="">Select Type</option>
            //                     <option value="Credit">Credit</option>
            //                     <option value="Debit">Debit</option>
            //                 </Form.Select>
            //                 {errors.type && touched.type ? (
            //                     <p className='text-danger'>{errors.type}</p>
            //                 ) : null}
            //             </Form.Group>
            // )
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="action_icon_wrapper d-flex justify-content-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                        <Button className="btn btn-icon btn-primary" onClick={() => { dispatch(openModal({ componentName: 'ViewTransaction', data: row })); }}><i className="fe fe-eye"></i></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button className="btn btn-icon btn-warning" variant="" onClick={() => { dispatch(openModal({ componentName: 'EditTransaction', data: row })); }}><i className="fe fe-edit"></i></Button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];

    const filteredData = data.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = pageSize;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const displayPages = () => {
        const pageButtons = [];
        const delta = 2;
        const left = currentPage - delta;
        const right = currentPage + delta + 1;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= left && i < right)) {
                pageButtons.push(
                    <li key={i} className={currentPage === i ? "active" : ""}>
                        <Button className="btn btn-default" variant="default" onClick={() => paginate(i)}>
                            {i}
                        </Button>
                    </li>
                );
            } else if (i === left - 1 || i === right) {
                pageButtons.push(
                    <li key={i} className="ellipsis_pagination">...</li>
                );
            }
        }
        return pageButtons;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="e-table pb-5 table-responsive">
            <Row className="justify-content-end">
                <Col sm={3}>
                    <Form.Group className="m-3">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <DataTable data={currentItems} columns={COLUMNS} striped />
            <div className="pagination_wrapper">
                <ul className="pagination">
                    <li>
                        <Button className="btn btn-default" variant="default" onClick={prevPage}>
                            <i className="fa fa-angle-left"></i> Previous
                        </Button>
                    </li>
                    {displayPages()}
                    <li>
                        <Button className="btn btn-default" variant="default" onClick={nextPage}>
                            Next <i className="fa fa-angle-right"></i>
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
