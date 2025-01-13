import React, { useState } from "react";
import {
  Nav,
  TabContainer,
  Tabs,
  Tab,
  Row,
  Card,
  Col,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader";
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";
// import {
//   useGetAllUsersQuery,
//   useUpdateUserStatusMutation,
// } from "../redux/features/AuthenticationEndPoints";
import axios from "axios";
import { API_BASE_URL } from "../utils/config";

export default function UserDataTable() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryParams, setQueryParams] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    fromDate: "",
    toDate: "",
  });

  // const [showModal, setShowModal] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryParams({
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      fromDate,
      toDate,
    });
  };


  const data = [
    {
      id: 1,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
    {
      id: 1,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
    {
      id: 2,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
    {
      id: 3,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
    {
      id: 4,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
    {
      id: 5,
      first_name: "Admin",
      username: "aadmin001",
      email: "admin@gmail.com",
      phone: "82798693598",
      createdAt: "06-01-2025",
      status: true
    },
  ]

  const [serialNumber, setSerialNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();


  // if (isLoading || isFetching) {
  //   return <Loader />;
  // }
  // if (isError) {
  //   return <Error error_mes={error} />;
  // }

  // if (isSuccess) {
  const COLUMNS = [
    {
      name: "#",
      selector: (row, index) => index + serialNumber,
      sortable: true,
    },
    {
      name: "Full Name",
      sortable: true,
      cell: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: "UserName",
      sortable: true,
      cell: (row) => row?.username,
    },
    // {
    //   name: "Image",
    //   selector: (row) => row?.files[0],
    //   cell: (row) => <img src={row?.profile_pic} width={75} height={75} />,
    // },
    {
      name: "Email",
      sortable: true,
      cell: (row) => row?.email,
    },
    {
      name: "Phone Number",
      sortable: true,
      cell: (row) => row?.phone,
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
        return (
          <label className="custom-switch">
            <input
              type="checkbox"
              className="custom-switch-input"
            // onChange={handleStatusChange}
            // checked={checked}
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
            <Button
              className="btn btn-icon btn-primary"
              onClick={() => {
                dispatch(
                  openModal({ componentName: "ViewUserModal", data: row })
                );
              }}
            >
              <i className="fe fe-eye"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Change Password</Tooltip>}
          >
            <Button
              className="btn btn-icon btn-primary"
              onClick={() => {
                dispatch(
                  openModal({
                    componentName: "ChangePasswordModal",
                    data: row,
                  })
                );
              }}
            >
              <i className="fe fe-lock"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>Block</Tooltip>}>
            <Button
              className="btn btn-icon btn-danger"
              onClick={() => {
                dispatch(
                  openModal({
                    componentName: "BlockUserModal",
                    data: row,
                  })
                );
              }}
            >
              <i className="fe fe-x-circle"></i>
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  // const handleBlockUser = (user) => {
  //   setSelectedUser(user);
  //   setShowModal(true);
  // };

  // const confirmBlockUser = async () => {
  //   try {
      // Make the API request to block the user
  //     const response = await axios.put(`${API_BASE_URL}/blockUser/${selectedUser.id}`, { status: false });
  //     if (response.status === 200) {
  //       toast.success("User has been blocked successfully!");
  //       setShowModal(false);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to block the user!");
  //   }
  // };

  const postsData =
    Array.isArray(data) && data?.length > 0 ? data : [];
  const filteredData = postsData?.filter((item) =>
    item?.username?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Button
              className="btn btn-default"
              variant="default"
              onClick={() => paginate(i)}
            >
              {i}
            </Button>
          </li>
        );
      } else if (i === left - 1 || i === right + 1) {
        pageButtons.push(
          <li key={i} className="ellipsis_pagination">
            ......
          </li>
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
        <Row className="justify-content-end mt-3 mx-2 align-items-center">
          <Col sm={6} xs={12}>
            <div className="d-block ms-5">
              <span>Show</span>
              <select
                className="mx-2"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[10, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>Entries</span>
            </div>
          </Col>
          <Col sm={6} xs={12} className="text-sm-end">
            <Button
              className="btn btn-success text-white me-3 border-success"
            >
              <i className="fa fa-download"></i> Export
            </Button>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-5 mx-2" style={{ rowGap: "10px" }}>
            <Col md={2}>
              <Form.Control
                type="text"
                name="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Search By First Name"
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="text"
                name="last_name"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Search By Last Name"
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="text"
                name="username"
                className="date-input"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Search By Username"
              />
            </Col>
            <Col
              md={2}
              className={`date-input-container ${!fromDate ? 'empty' : ''}`}
            >
              <Form.Control
                type="date"
                className="date-input"
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="From Date"
                name="fromDate"
                max={new Date().toISOString().split("T")[0]}
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
                max={new Date().toISOString().split("T")[0]}
              />
              <span className="placeholder">Date To</span>
            </Col>
            <Col md={2}>
              <Button type="submit" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-end">
          <Col as={Col} sm={3}>
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
              <Button
                className="btn btn-default"
                variant="default"
                onClick={prevPage}
              >
                <i className="fa fa-angle-left"></i> Previous
              </Button>
            </li>
            {displayPages()}
            <li>
              <Button
                className="btn btn-default"
                variant="default"
                onClick={nextPage}
              >
                Next <i className="fa fa-angle-right"></i>
              </Button>
            </li>
          </ul>
        </div>
      </div >
    </>
  );
  // }
}
