import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";

const Sort = ({ sort, setSort }) => {
    const onSelectChange = ({ currentTarget: input }) => {
        setSort({ sort: input.value, order: sort.order });
        // console.log(sort);
    };

    const onArrowChange = () => {
        if (sort.order === "asc") {
            setSort({ sort: sort.sort, order: "desc" });
        } else {
            setSort({ sort: sort.sort, order: "asc" });
        }
    };
    return (
        <>
            <h5>Sort By</h5>
            <div style={{ display: "flex" }}>
                <Form.Select aria-label="Default select example" onChange={onSelectChange} defaultValue={sort.sort}>

                    <option value="fName">Name</option>
                    <option value="doj">DOJ</option>
                    <option value="departMent">Department</option>
                    <option value="salary">Salary</option>

                </Form.Select>
                <Button variant="light" onClick={onArrowChange}>

                    <BsFillArrowDownCircleFill />
                    <BsFillArrowUpCircleFill />
                </Button>
            </div>
        </>
    );
};

export default Sort;