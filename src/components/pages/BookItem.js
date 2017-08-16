import React ,{Component} from 'react'
import {Col, Row, Well, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart} from '../../actions/carts'

class BookItem extends Component {

  handleCart(e){
    const currentBook = [...this.props.cart]
    const id = this.props._id
    const indexToUpdate = currentBook.findIndex(
      function(book){
        return id === book._id
      }
    )
    
    if(indexToUpdate === -1 || this.props.cart[0] === undefined){
      const book = [{
        _id:this.props._id,
        title:this.props.title,
        description:this.props.description,
        price:this.props.price
      }]
      this.props.addToCart(book)
    }
  }

  render(){
    const book = this.props.book
    return(
        <Well>
          <Row>
            <Col xs={12} >
              <h6>{this.props.title}</h6>
              <p>{this.props.description}</p>
              <h6>usd. {this.props.price}</h6>
              <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
            </Col>
          </Row>
        </Well>
    )
  }
}

function mapStateToProps(state){
  return {
    cart:state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart:addToCart
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem)
