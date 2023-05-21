import React from 'react';
import ReactModal from 'react-modal';
import Parser from 'html-react-parser';

class ProductDetail extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

this.customStyles = {
  overlay: {zIndex: 1500}
};
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
	getSrcImg(b64) {
		if(typeof b64 === "undefined")
			return null;
		
		var signatures = {
			R0lGODdh: "image/gif",
			R0lGODlh: "image/gif",
			iVBORw0KGgo: "image/png",
			"/9j/": "image/jpg"
		};
		for (var s in signatures) {
			if (b64.indexOf(s) === 0) {
				return 'data:' + signatures[s] + ';base64,' + b64;
			}
		}
		
		return null;
	}
	
	formatDate(date) {
		if(date == null)
			return null;

		return date.slice(0, 10).split("-").reverse().join("/");
	}
	
	formatDateAuthor(date) {
		if(date == null)
			return null;

		return date.split("-").reverse().join("/");
	}
  
  render () {
    return (
      <div>
        <button className="btn btn-sm btn-info text-white mb-1" onClick={this.handleOpenModal}><i class="fas fa-plus"></i> More info</button>
        <ReactModal
		   style={this.customStyles}
           isOpen={this.state.showModal}
           contentLabel="Book Details"
        >
		<h4>{this.props.item.title}</h4>
		{ (this.props.item.book.subtitle != null && this.props.item.book.subtitle != "") &&
			<p><i>{this.props.item.book.subtitle}</i></p>
		}
		<hr></hr>
		<div className="row" id="container_abstract_content">
			<div className="col-sm-4">{Parser(this.props.image)}</div>
			<div className="col-sm-8">
				{Parser(this.props.text)}
				
				{ (this.props.item.book.isbn10 != null && this.props.item.book.isbn10 != "") &&
					<p className="mb-0"><b>ISBN-10: </b>{this.props.item.book.isbn10}</p>
				}
				
				{ (this.props.item.book.isbn13 != null && this.props.item.book.isbn13 != "") &&
					<p className="mb-0"><b>ISBN-13: </b>{this.props.item.book.isbn13}</p>
				}
				
				{ (this.props.item.book.numberPage != null && this.props.item.book.numberPage != "") &&
					<p className="mb-0"><b>Number of pages: </b>{this.props.item.book.numberPage}</p>
				}
				
				{ (this.props.item.book.publicationDate != null && this.props.item.book.publicationDate != "") &&
					<p className="mb-0"><b>Publication date: </b>{this.formatDate(this.props.item.book.publicationDate)}</p>
				}
				
				{ (this.props.item.book.hasOwnProperty('publisher') && this.props.item.book.publisher.hasOwnProperty('title') && this.props.item.book.publisher.title != null && this.props.item.book.publisher.title != "") &&
					<p className="mb-0"><b>Publisher: </b>{this.props.item.book.publisher.title}</p>
				}
				<a href={this.props.url} className="btn btn-sm amazon text-white mt-2"><i className="fab fa-alipay"></i> Buy it on Amazon</a>
			</div>
		</div>
		<hr></hr>
		{ (this.props.item.book.book.text != null && this.props.item.book.book.text != "") &&
			<div className="row">
				<h5>Abstract</h5>
				<div className="text-justify">{Parser(this.props.item.book.book.text)}</div>
			</div>
		}
		<div className="row">
			<h5>Authors</h5>
			{this.props.item.book.book.authors.map((author, index) => (
				<div className="card border-0">
					<div className="card-horizontal">
						{author.imgBase64 != null &&
							<div className="img-square-wrapper">
								<img src={this.getSrcImg(author.imgBase64)} alt={this.props.item.title} />
							</div>
						}
						<div className="card-body">
							<h6 className="card-title">{author.title}</h6>
							{ (author.birthDate != null && author.birthDate != "") &&
								<p className="card-text mb-0"><b>Birth date: </b>{this.formatDateAuthor(author.birthDate)}</p>
							}
							
							{ (author.deathDate != null && author.deathDate != "") &&
								<p className="card-text mb-0"><b>Death date: </b>{this.formatDateAuthor(author.deathDate)}</p>
							}
						</div>
					</div>
				</div>
			))}
		</div>
		<hr></hr>
        <button className="btn btn-danger float-end" onClick={this.handleCloseModal}><i className="fas fa-times"></i> Close</button>
        </ReactModal>
      </div>
    );
  }
}
export default ProductDetail;