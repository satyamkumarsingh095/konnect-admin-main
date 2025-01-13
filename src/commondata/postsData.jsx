import React, { useState } from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useGetAllPostsQuery, useUpdateStatusMutation } from "../redux/features/PostsEndPoints";
import Loader from "../layouts/layoutcomponents/loader";
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";

export default function PostsDataTable() {
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [queryParams, setQueryParams] = useState({
        user_name: '',
        fromDate: '',
        toDate: '',
        status: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setQueryParams({ user_name: userName, status, fromDate, toDate });
    };

    const [serialNumber, setSerialNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    // const { data, isError, error, isLoading, isFetching, isSuccess, refetch } = useGetAllPostsQuery(queryParams);
    // const [updateStatus, { isLoading: loading }] = useUpdateStatusMutation();

    // if (isLoading || isFetching) {
    //     return <Loader />;
    // }
    // if (isError) {
    //     return <Error error_mes={error} />;
    // }

    // if (isSuccess) {


    const data = [
        {
            id: 1,
            first_name: "Admin",
            last_name: "kumar",
            username: "kumar",
            createdAt: "06-01-2025",
            status: true


        }
    ]
    const COLUMNS = [
        {
            name: "#",
            selector: (row, index) => index + serialNumber,
            sortable: true,
        },
        {
            name: "Full Name",
            sortable: true,
            cell: (row) => `${row.first_name} ${row.last_name}`
        },
        {
            name: "UserName",
            sortable: true,
            cell: (row) => row?.username
        },
        // {
        //     name: "Image",
        //     selector: (row) => row?.files[0],
        //     cell: (row) => (
        //         <img src={row?.files[0]} width={75} height={75} />
        //     )
        // },
        {
            name: "Created At",
            selector: (row) => row?.createdAt,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => {
                const [checked, setChecked] = useState(row?.status);
                // const handleStatusChange = async () => {
                //     try {
                //         setChecked(!checked);
                //         const response = await updateStatus(row.id);
                //         if (response?.data?.http_status_code === 200) {
                //             toast.success(response.data.message);
                //         }
                //     } catch (error) {
                //         console.error(error);
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
                )
            },
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="action_icon_wrapper d-flex justify-content-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                        <Button className="btn btn-icon btn-primary" onClick={() => { dispatch(openModal({ componentName: 'ViewSinglePost', data: row })) }}><i className="fe fe-eye"></i></Button>
                    </OverlayTrigger>

                    {/* <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                            <Button className="btn btn-icon btn-warning" onClick={() => { dispatch(openModal({ componentName: 'ViewSinglePost', data: row })) }}><i className="fe fe-edit"></i></Button>
                        </OverlayTrigger> */}

                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Button className="btn btn-icon btn-danger" variant="" onClick={() => { dispatch(openModal({ componentName: 'DeletePost', data: row })) }}><i className="fa fa-trash text-light"></i></Button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];

    // const postsData = Array.isArray(data?.data) && data?.data.length > 0 ? data.data : [];
    const postsData = data ?? [];

    const filteredData = postsData?.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="e-table pb-5 table-responsive">
                {/* {loading && <Loader />} */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mt-5 mx-2" style={{ rowGap: "10px" }}>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="username"
                                className="date-input"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Search By Username"
                            />
                        </Col>
                        <Col md={2}>
                            <Form.Select name="search_status" onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Search By Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Form.Select>
                        </Col>
                        <Col md={2}
                            className={`date-input-container ${!fromDate ? 'empty' : ''}`}
                        >
                            <Form.Control
                                type="date"
                                className="date-input"
                                onChange={(e) => setFromDate(e.target.value)}
                                placeholder="From Date"
                                name="fromDate"
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <span className="placeholder">Date From</span>
                        </Col>
                        <Col md={2}
                            className={`date-input-container ${!toDate ? 'empty' : ''}`}
                        >
                            <Form.Control
                                type="date"
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder="To Date"
                                name="toDate"
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <span className="placeholder">Date To</span>
                        </Col>
                        <Col md={2}>
                            <Button type="submit" className="w-100">Search</Button>
                        </Col>

                        <Col md={1}>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Add Post</Tooltip>}>
                                <Button className="btn btn-icon btn-success" onClick={() => { dispatch(openModal({ componentName: 'AddPost', })) }} ><i className="fe fe-plus"></i></Button>
                            </OverlayTrigger>
                        </Col>

                    </Row>
                </Form>


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
