import React, { useState } from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button, Form, OverlayTrigger, Tooltip, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader"
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
// import { useGetAllPagesQuery, useUpdatePageStatusMutation } from "../redux/features/PagesEndPoints";
import toast from "react-hot-toast";


export default function PagesDataTable() {
    const [serialNumber, setSerialNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    // const { data, isError, error, isLoading, isFetching, isSuccess } = useGetAllPagesQuery()
    // const [updateStatus, { isLoading: loading }] = useUpdatePageStatusMutation()
    // if (isLoading || isFetching) {
    //     return <Loader />;
    // }
    // if (isError) {
    //     return <Error error_mes={error} />;
    // }


    const data = [
        {
            id: 1,
            type: "one",
            title: "one",
            createdAt: "2022-07-10",
            status: false,
        },
        {
            id: 2,
            type: "two",
            title: "two",
            createdAt: "2022-08-10",
            status: true,
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
            name: "Page type",
            sortable: true,
            cell: (row) => row?.type
        },
        {
            name: "Page Title",
            sortable: true,
            cell: (row) => row?.title
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

                const [checked, setChecked] = useState(row?.status);
                const handleStatusChange = async () => {
                    try {
                        setChecked(!checked);
                        const response = await updateStatus(row.id);
                        if (response?.data?.http_status_code === 200) {
                            toast.success(response.data.message)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };
                return (
                    <label className="custom-switch">
                        <input
                            type="checkbox"
                            className="custom-switch-input"
                            onChange={handleStatusChange}
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
                        <Link to={"/view-page"} state={row} >
                            <Button className="btn btn-icon btn-primary"><i className="fe fe-eye"></i></Button>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Link to={"/edit-page"} state={row} >
                            {/* <Button className="btn btn-icon btn-warning" variant="" onClick={() => { dispatch(openModal({ componentName: 'EditPage', data: row })) }}><i className="fe fe-edit"></i></Button> */}
                            <Button className="btn btn-icon btn-warning" variant="" ><i className="fe fe-edit"></i></Button>
                        </Link>
                    </OverlayTrigger>
                    {/* <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                            <Button className="btn btn-icon btn-danger" variant="" onClick={() => { dispatch(openModal({ componentName: 'DeletePage', data: row })) }}><i className="fa fa-trash text-light"></i></Button>
                        </OverlayTrigger> */}
                </div>
            ),
        },
    ];

    // const postsData = Array.isArray(data?.data) && data?.data.length > 0 ? data.data : [];
    const postsData = data ?? [];

    const filteredData = postsData?.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
