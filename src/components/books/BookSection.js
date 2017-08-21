import React, {Component} from 'react'
import {Carousel, Grid ,Col, Row, Button} from 'react-bootstrap'
import BookList from './BookList'
import BookForm from './BookForm'
import Cart from '../cart/Cart'


class BookSection extends Component {
  render() {
    return(
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          <Cart />
        </Row>
        <Row style={{marginTop:'15px'}}>
          <BookList />
        </Row>
      </Grid>
    )
  }
}

export default BookSection
