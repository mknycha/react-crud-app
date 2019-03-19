import React from 'react'
import PostDetails from './PostDetails'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    fetch('/api/posts.json')
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            posts: res,
          })
        }
      )
  }

  render() {
    const { posts } = this.state
    return(
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <PostDetails post={post} />
          </li>
        ))}
      </ul>
    )
  }
}

export default PostList