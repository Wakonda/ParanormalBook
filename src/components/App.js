import Products from './Products'
import Navbar from './Navbar'
import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: ""
		};

		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	triggerSearch() {
		this.search.toggleSearch();
	}

	handleSearchChange (e) {
		if (e.target.value == "")
			this.search.toggleSearch();

		this.setState({ searchValue: e.target.value });
	}

    handleSearchClick(data) {
    }
	
	render() {
		return (
			<div className="App">
			  <Navbar handleSearchClick={this.triggerSearch.bind(this)} handleSearchChange={this.handleSearchChange} />
				<main role="main" className="bg-black">
					<div className="album py-4">
						<div className="container-fluid px-4">
							<Products searchValue={this.state.searchValue} ref={search => this.search = search} />
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default App;