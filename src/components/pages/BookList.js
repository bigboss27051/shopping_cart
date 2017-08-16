import React , {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getBooks} from '../../actions/books'
import {Grid ,Col, Row, Button} from 'react-bootstrap'
import BookItem from './BookItem'
import BookForm from './BookForm'
import Cart from './Cart'

class BookList extends Component {
  componentDisMount(){
    this.props.getBooks();
  }
  render(){
    return(
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <BookForm />
          </Col>
          {
            this.props.books.map(book =>
              <Col xs={12} sm={6} md={4} key={book._id}>
                <BookItem
                  _id={book._id}
                  title={book.title}
                  description={book.description}
                  price={book.price} />
              </Col>
            )
          }
        </Row>
      </Grid>
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
