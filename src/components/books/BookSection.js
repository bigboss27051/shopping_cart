import React, {Component} from 'react'
import {Grid ,Col, Row, Button} from 'react-bootstrap'
import BookList from './BookList'
import BookForm from './BookForm'
import Cart from '../cart/Cart'


class BookSection extends Component {
  render() {
    return(
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <BookForm />
          </Col>
          <BookList />
        </Row>
      </Grid>
    )
  }
}

export default BookSection
