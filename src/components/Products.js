import React from 'react';
import Pagination from './Pagination';
import ProductDetail from './ProductDetail';
import Parser from 'html-react-parser';

class Products extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			pageCount: 1,
			currentPage: 1,
			themeSearch: null,
			authorSearch: null
		};

		this.handlePageClick = this.handlePageClick.bind(this);
		this.handleThemeClick = this.handleThemeClick.bind(this);
		this.handleAuthorClick = this.handleAuthorClick.bind(this);
		this.handleRemoveThemeClick = this.handleRemoveThemeClick.bind(this);
		this.handleRemoveAuthorClick = this.handleRemoveAuthorClick.bind(this);
		this.totalPostsByPage = 12;
	}
	
	currencySymbol(currencyPrice) {
		const currencyArray = {
			"usd": "$",
			"real": "R$",
			"cad": "CAD",
			"gbp": "£",
			"euro": "€"
		}
		
		return currencyArray[currencyPrice];
	}

	componentDidMount() {
		this.getDatas();
	}
  
	handlePageClick (data) {
		data = data.selected + 1;
		
		//setCurrentPage(data)

		this.setState({currentPage: data}, function () {
			this.getDatas();
		});
	}

	toggleSearch() {
		this.setState({searchValueAuthor: "", searchValueTheme: "", currentPage: 1}, function () {
			this.getDatas();
		});
	}
  
	getDatas() {
		var textSearch = "";

		if (this.props.searchValue !== "")
			textSearch = "&or_search=" + this.props.searchValue;
		
		if (typeof this.state.themeSearch !== "undefined" && this.state.themeSearch !== null)
			textSearch = "&book.book.theme.title=" + this.state.themeSearch;
		
		if (typeof this.state.authorSearch !== "undefined" && this.state.authorSearch !== null)
			textSearch = "&book.book.authors.title=" + this.state.authorSearch;

		const url = process.env.REACT_APP_URL + "api/book_stores?page=" + this.state.currentPage + "&order[id]=desc" + textSearch + "&book.book.language.abbreviation=fr";
		
		this.setState({
			isLoaded: false
		});

		fetch(url)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result["hydra:member"],
					pageCount: Math.ceil(result["hydra:totalItems"] / this.totalPostsByPage),
					currentPage: this.state.currentPage
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}
	
	handleThemeClick(e) {
		this.setState({themeSearch: e.target.dataset.theme, currentPage: 1}, function () {
			this.getDatas();
		});

		e.preventDefault()
	}
	
	handleRemoveThemeClick(e) {
		this.setState({themeSearch: null, currentPage: 1}, function () {
			this.getDatas();
		});

		e.preventDefault()
	}
	
	handleAuthorClick(e) {
		this.setState({authorSearch: e.target.dataset.author, currentPage: 1}, function () {
			this.getDatas();
		});

		e.preventDefault()
	}
	
	handleRemoveAuthorClick(e) {
		this.setState({authorSearch: null, currentPage: 1}, function () {
			this.getDatas();
		});

		e.preventDefault()
	}
	
	getFilters() {
		return (
			<div className="mb-2">
				{(this.state.authorSearch != null || this.state.themeSearch) &&
					<div>
						{this.state.authorSearch != null &&
							<div className="badge bg-danger">
								<div>{this.state.authorSearch}
								<a href="#" className="text-white ms-2" onClick={this.handleRemoveAuthorClick}><i className="fas fa-times"></i></a></div>
							</div>
						}

						{this.state.themeSearch != null &&
							<div className="badge bg-danger">
								<div>{this.state.themeSearch}
								<a href="#" className="text-white ms-2" onClick={this.handleRemoveThemeClick}><i className="fas fa-times"></i></a></div>
							</div>
						}
					</div>
				}
			</div>
		)
	}

	render() {
		const { error, isLoaded, items } = this.state;

		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="text-center text-white"><div className="fa-3x"><i className="fas fa-spinner fa-pulse load-spinner"></i></div>Chargement…</div>;
		} else if (items.length == 0) {
			return (
				<div>
					{this.getFilters()}
					<div className="alert alert-info">
						Aucun résultat n'a été trouvé !
					</div>
				</div>
			)
		} else {
			return (
				<div>
					{this.getFilters()}
					<div className="row">
						{items.map(item => (
							<div className="col-lg-3 col-md-4 col-sm-6">
								<div className="card mb-4 shadow-sm">
									<div className="text-center">{Parser(item.imageEmbeddedCode)}</div>
									<div className="card-body">
										<p className="text-center fw-bold">{item.title}</p>
										{item.price > 0 && 
											<p className="price text-center"><span>{item.price} {this.currencySymbol(item.currencyPrice)}</span></p>
										}
										<div className="text-center">
											<i className="fas fa-sun"></i> <a data-theme={item.book.book.theme.title} href="#" onClick={this.handleThemeClick}>{item.book.book.theme.title}</a>
											<br />
											{ item.book.book.authors.length > 0 ? <i className="fas fa-user"></i> : ''}
											{item.book.book.authors.map((author, index) => (
												<span> <a data-author={author.title} href="#" onClick={this.handleAuthorClick}>{author.title}</a>{item.book.book.authors.length < index ? ", " : ""}</span>
											))}
										</div>
										<div className="card-text"></div>
										<hr />
										<div className="text-center">
										    <ProductDetail 
												image={item.imageEmbeddedCode}
												text={item.text == null ? "" : item.text}
												url={item.externalAmazonStoreLink}
												title={item.title}
												item={item}
											></ProductDetail>
											<a href={item.externalAmazonStoreLink} className="btn btn-sm amazon text-white"><i className="fab fa-amazon"></i> Achetez-le sur Amazon</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

				<Pagination 
					pageCount={this.state.pageCount}
					forcePage={this.state.currentPage - 1}
					previousLabel={'<'}
					nextLabel={'>'}
					onPageChange={this.handlePageClick}
					pageRangeDisplayed={this.totalPostsByPage}
				></Pagination>
				</div>
			);
		}
	}
}
export default Products;