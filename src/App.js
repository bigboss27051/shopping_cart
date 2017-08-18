import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducers from './reducers/'
import {postBook,deleteBook,updateBook} from './actions/books'
//import logger from 'redux-logger'
import {applyMiddleware,createStore} from 'redux'
import {Provider} from 'react-redux'

import BookSection from './components/books/BookSection'
import Menu from './components/pages/menu'
import Footer from './components/pages/footer'
import Cart from './components/cart/Cart';
import BookForm from './components/books/BookForm';



//const middleware = applyMiddleware(logger);
const store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Menu />
            <Switch>
              <Route exact path='/' component={BookSection} />
              <Route exact path='/admin' component={BookForm} />
              <Route exact path='/cart' component={Cart} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
