import React , {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getBooks} from '../../actions/books'
import {Grid ,Col, Row, Button} from 'react-bootstrap'
import BookItem from './BookItem'
import BookForm from './BookForm'

class BookList extends Component {
  componentDidMount(){
    this.props.getBooks();
  }
  render(){
    const bookList = this.props.books.map((book) => {
      return (
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem
            _id={book._id}
            title={book.title}
            description={book.description}
            image={book.image}
            price={book.price} />
        </Col>
      )
    })

    return(
      <div>
         {bookList}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    books:state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks:getBooks
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList);
