import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import ModalPopUp from './ModalPopUp';
import PaginationComponent from './PaginationComponent';
import Search from './Search';
import Sort from './Sort';
import Spinner from 'react-bootstrap/Spinner';


const TableBody = () => {

    // table data local state
    const [datas, setDatas] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sort: "fName", order: "asc" });
    const [isLoading, setIsLoading] = useState(true);

    // fetch API
    const fetchData = async () => {
        const data = await axios.get(`/api/office?search=${search}&sort=${sort.sort},${sort.order
            }`);
        return data
    }
    useEffect(() => {
        fetchData()
            .then(res => {
                setDatas(res.data.data)
                setIsLoading(false)
            })
    }, [search, sort])

    // pagaination data
    const postsPerPage = 10;
    const pagesVisited = pageNumber * postsPerPage;

    const pageCount = Math.ceil(datas?.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Search setSearch={(search) => setSearch(search)} />
                </Col>
                <Col xs={4}>
                    <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                </Col>
                <Col xs={12} className="my-4">

                    {isLoading ? <div className="spinner-parent">
                        <Spinner animation="grow" variant="success" />
                    </div> : <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>First Name </th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>DOJ</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas?.slice(pagesVisited, pagesVisited + postsPerPage).map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item._id.slice(-5)}</td>
                                    <td>{item.fName}</td>
                                    <td>{item.mName}</td>
                                    <td>{item.lName}</td>
                                    <td>{item.doj}</td>
                                    <td>{item.departMent}</td>
                                    <td>${item.salary}</td>
                                    <td><ModalPopUp id={item._id} fname={item.fName} mname={item.mName} lname={item.lName} doj={item.doj} department={item.departMent} salary={item.salary} /></td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>}
                    <PaginationComponent changePage={changePage} pageCount={pageCount} />
                </Col>

            </Row>

        </Container>
    );
};

export default TableBody;