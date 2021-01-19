import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'


class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  // ********************** BookmarkList RENDER  **********************
  render() {
    const { bookmarks } = this.props
    return (

      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark => {
            return (
              <BookmarkItem
                key={bookmark.id}
                {...bookmark}
              />
            )
          }
          )}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;
