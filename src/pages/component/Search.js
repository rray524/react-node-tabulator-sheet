import React from 'react';
import Form from 'react-bootstrap/Form';
const Search = ({ setSearch }) => {
    return (
        <Form className="d-flex mt-5">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />

        </Form>
    );
};

export default Search;