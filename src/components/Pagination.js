import React from 'react';
import ReactPaginate from 'react-paginate';

class Pagination extends React.Component {
	render() {
		
	return (
        <ReactPaginate
		  previousLabel={this.props.previousLabel}
		  nextLabel={this.props.nextLabel}
		  breakLabel={'...'}
		  breakClassName={'break-me'}
		  pageCount={this.props.pageCount}
		  marginPagesDisplayed={2}
		  forcePage={this.props.forcePage}
		  pageRangeDisplayed={this.props.totalPostsByPage}
		  containerClassName={'pagination justify-content-center'}
		  subContainerClassName={'pages pagination'}
		  activeClassName={'active'}
		  onPageChange={this.props.onPageChange}
		  previousClassName={'page-item'}
		  previousLinkClassName={'page-link arrow'}
		  nextClassName={'page-item'}
		  nextLinkClassName={'page-link arrow'}
		  pageClassName={'page-item'}
		  pageLinkClassName={'page-link'}
		  />
		);
	}
}

export default Pagination;