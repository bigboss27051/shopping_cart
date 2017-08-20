import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {deleteCartItem, addToCart, updateCart, getCart} from '../../actions/cart'

class Cart extends Component {
  constructor(){
    super();
    this.state = {
      showModal:false
    }
  }
  componentDidMount(){
    this.props.getCart();
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal:false})
  }
  handleDelete(_id){
    const currentCartToDelete = this.props.cart
    const indexToDelete = currentCartToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    let currentAfterDelete = [...currentCartToDelete.slice(0,indexToDelete),
    ...currentCartToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(currentAfterDelete)
  }
  onIncrement(_id){
    this.props.updateCart(_id,1,this.props.cart)
  }
  onDecrement(_id){
    this.props.updateCart(_id,-1,this.props.cart)
  }
  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    }else{
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(
      <div></div>
    )
  }
  renderCart(){
    const cartItemList = this.props.cart.map((cartArr) => {
        return (
          <Panel key={cartArr._id}>
            <Row>
              <Col xs={12} sm={4}>
                <h6>{cartArr.title}</h6><span> </span>
              </Col>
              <Col xs={12} sm={2}>
                <h6>usd. {cartArr.price}</h6>
              </Col>
              <Col xs={12} sm={2}>
                <h6>qty. <Label bsStyle='success'>{cartArr.quantity}</Label></h6>
              </Col>
              <Col xs={6} sm={4}>
                <ButtonGroup style={{minWidth:'300px'}}>
                  <Button bsStyle='default' bsSize='small' onClick={this.onDecrement.bind(this,cartArr._id)}>-</Button>
                  <Button bsStyle='default' bsSize='small' onClick={this.onIncrement.bind(this,cartArr._id)} >+</Button>
                  <span>  </span>
                  <Button bsStyle='danger' bsSize='small' onClick={this.handleDelete.bind(this,cartArr._id)} >DELETE</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: </h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
          </Panel>
        )
    },this)
    return (
      <Panel header='Cart' bsStyle='primary'>
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount: {this.props.totalAmount}</h6>
            <Button bsStyle='success' bsSize='small' onClick={this.open.bind(this)} >
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }
}

function mapStateToProps(state){
  return {
    cart:state.cart.cart,
    totalAmount:state.cart.totalAmount,
    totalQty:state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem:deleteCartItem,
    addToCart:addToCart,
    updateCart:updateCart,
    getCart:getCart
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
