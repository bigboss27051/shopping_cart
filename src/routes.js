import React from 'react';
import {render} from 'react-dom';
// REACT-ROUTER
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Route, Switch} from 'react-router-dom';
import Menu from './components/pages/menu';
import Footer from './components/pages/footer';
// END REACT- ROUTER

import BookList from './components/books/bookList';
import Cart from './components/cart/Cart';
import BookForm from './components/books/bookForm';
//import Main from './main';

// RETRIVES COMPONENTS BASED ON STATUS
const Status = function ({ code, children }){
  return (
        <Route render={function({ staticContext }) {
          if (staticContext)
            staticContext.status = code
          return children
        }}/>
    )
}
//NOT-FOUND COMPONENT
const NotFound = function(){
    return (
      <Status code={404}>
        <div>
          <h2> Sorry, cannot find this page</h2>
        </div>
      </Status>
    )
}
// CLIENT-SERVER SHARED ROUTES
const routes = (
      <div>
          <Menu />
          <Switch>
              <Route exact={true} path="/" component={BookList}/>
              <Route path="/admin" component={BookForm}/>
              <Route path="/cart" component={Cart}/>
              <Route component={NotFound}/>
          </Switch>
          <Footer />
      </div>
    );

export default routes;
