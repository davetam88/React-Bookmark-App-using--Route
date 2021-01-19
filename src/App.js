import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };

  // ********************** call back **********************
  // call this by fetch route at app start up,
  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  // call this when a new book mark is added.
  addBookmark = bookmark => {
    // add tthe bootk mark to end of the file list
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })

  }


  // ***************** APP API FETCH HERE  ************************
  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  // ******************** APP RENDER  HERE  ***************************
  render() {
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          {/* cur.. */}

          {/**************   ROUTE / ********************** */}
          <Route
            exact
            path='/'
            render={({ history }) => {
              return <BookmarkList bookmarks={bookmarks} />
            }}
          />


          {/**************   ROUTE ADD BOOMKMAKR ********************** */}
          <Route
            path='/add-bookmark'
            render={({ history }) => {
              return <AddBookmark
                onAddBookmark={this.addBookmark}
                //   the history is now a prop for the AddBookmark component!
                // when it is cancel, go back to the / page.
                onClickCancel={() => history.push('/')}
              />
            }}
          />

          {/**************   ROUTE ADD BOOMKMAKR ********************** */}
          <Route
            exact path='/test'
            render={({ history }) => {
              return (
                <h1>this is a test </h1>
              )
            }}
          />


        </div>
      </main>
    );
  }
}

export default App;


