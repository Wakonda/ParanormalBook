import React from 'react';

class Navbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-goldenrod">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Paranormal Book</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link text-white" aria-current="page" href="//wakonda666.blogspot.com/"><i className="fas fa-chevron-right"></i> Blog</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-white" href="//forum-en.activite-paranormale.com/"><i className="fas fa-chevron-right"></i> Forum</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-white" href="//activite-paranormale.net/classifiedads/"><i className="fas fa-chevron-right"></i> Classified Ads</a>
							</li>
						</ul>
						<form className="d-flex">
							<div className="input-group">
								<input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={ this.props.handleSearchChange }/>
								<button className="btn btn-secondary" type="button"><i className="fas fa-search" onClick={this.props.handleSearchClick}></i></button>
							</div>
						</form>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
