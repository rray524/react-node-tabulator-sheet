import React from 'react';
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ pageCount, changePage }) => {
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            renderOnZeroPageCount={null}
        />
    );
};

export default PaginationComponent;