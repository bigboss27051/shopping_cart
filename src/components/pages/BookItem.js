import React ,{Component} from 'react'
import {Col, Row, Well, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addToCart,updateCart} from '../../actions/cart'

class BookItem extends Component {

  handleCart(e){
    const currentBook = [...this.props.cart]
    const id = this.props._id
    const indexToUpdate = currentBook.findIndex(
      function(book){
        return id === book._id
      }
    )

    const book = [{
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price,
      quantity:1
    }]

    if(indexToUpdate === -1 || this.props.cart.length <= 0){

      this.props.addToCart(book)
    } else {
      let _id = this.props._id
      let carIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id
      })

      if(carIndex === -1){
        this.props.addToCart(book);
      }else{
        this.props.updateCart(_id,1)
      }
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
    addToCart:addToCart,
    updateCart:updateCart
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem)
