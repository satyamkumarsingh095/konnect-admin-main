import React, { useState } from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button, Form, OverlayTrigger, Tooltip, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader"
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";
// import { useAllQuotesQuery, useChangeStatusQuotesMutation } from "../redux/features/adminQuotesEndPoint";


export default function AllQuotesDataTable() {
    const [serialNumber, setSerialNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    // const { data, isError, error, isLoading, isFetching, isSuccess, refetch } = useAllQuotesQuery()

    // const [updateStatus, { isLoading: loading }] = useChangeStatusQuotesMutation()
    // if (isLoading || isFetching) {
    //     return <Loader />;
    // }
    // if (isError) {
    //     return <Error error_mes={error} />;
    // }

    const data = [
        {
            id: 1,
            content:"one",
            totalLikes: 10,
            createdAt: "06-01-2025",
            status: true
        }
    ]

    // if (isSuccess) {
    const COLUMNS = [
        {
            name: "#",
            selector: (row, index) => index + serialNumber,
            sortable: true,
        },
        {
            name: "Message",
            sortable: true,
            cell: (row) => row?.content
        },
        {
            name: "No. Of Likes",
            sortable: true,
            cell: (row) => row?.totalLikes
        },
        {
            name: "Created At",
            selector: (row) => row?.createdAt,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => {

                const [checked, setChecked] = useState(row?.status === true);

                // const handleStatusChange = async () => {
                //     try {
                //         const newStatus = !checked;
                //         const response = await updateStatus({
                //             quoteBody: { status: newStatus },
                //             quotesId: row.id
                //         });

                //         if (response?.data?.http_status_code === 200) {
                //             setChecked(newStatus);
                //             refetch();
                //             toast.success(response.data.message);
                //         } else {
                //             toast.error('Failed to update status');
                //         }
                //     } catch (error) {
                //         console.error(error);
                //         toast.error('An error occurred while updating the status');
                //     }
                // };

                return (
                    <label className="custom-switch">
                        <input
                            type="checkbox"
                            className="custom-switch-input"
                            // onChange={handleStatusChange}
                            checked={checked}
                        />
                        <span className="custom-switch-indicator custum-green-btn"></span>
                    </label>
                );
            },
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="action_icon_wrapper d-flex justify-content-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                        <Button className="btn btn-icon btn-primary" onClick={() => { dispatch(openModal({ componentName: 'ViewQuotes', data: row })) }}><i className="fe fe-eye"></i></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button className="btn btn-icon btn-warning" variant="" onClick={() => { dispatch(openModal({ componentName: 'EditQuotes', data: row })) }}><i className="fe fe-edit"></i></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Button className="btn btn-icon btn-danger" variant="" onClick={() => { dispatch(openModal({ componentName: 'DeleteQuotes', data: row })) }}><i className="fa fa-trash text-light"></i></Button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];


    const postsData = data ?? [];
    // const postsData = Array.isArray(data?.data?.messages) && data?.data?.messages.length > 0 ? data?.data?.messages : [];


    const filteredData = postsData?.filter((item) =>
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const itemsPerPage = pageSize;
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

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
            } else if (i === left - 1 || i === right + 1) {
                pageButtons.push(<li key={i} className="ellipsis_pagination">......</li>);
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
    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    return (
        <>
            {/* {loading && <Loader />} */}
            <div className="e-table pb-5 table-responsive">
                {/* {isLoading && <Loader />} */}
                <Row className="justify-content-end">
                    <Col as={Col} sm={3}>
                        <Form.Group className="m-3">
                            <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
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
        </>
    );
    // }
}
