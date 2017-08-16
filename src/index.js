// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import reducers from './reducers/'
import {postBook,deleteBook,updateBook} from './actions/books'
import logger from 'redux-logger'
import {applyMiddleware,createStore} from 'redux'
import {Provider} from 'react-redux'
import BookList from './components/pages/BookList.js'


const middleware = applyMiddleware(logger);
const store = createStore(reducers ,middleware);

ReactDOM.render(
  <Provider store={store}>
      <BookList />
  </Provider>,
  document.getElementById('root')
);
//
// store.dispatch(postBook(
//
// ))

// store.dispatch(deleteBook(
//   {id:1}
// ))
//
// store.dispatch(updateBook({
//   id:2,
//   title:'Learn React in 24h'
// }))
//
//
// store.dispatch(addToCart([{id:1}]))
