import React from 'react';
import PostSummary from './PostSummary';
import { List, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;
    return (
      <Container>
        <List>
          {posts.map(post => (
            <List.Item key={post.id}>
              <PostSummary post={post} />
              <Divider hidden />
            </List.Item>
          ))}
        </List>
        <Link to='/posts/new'>Add new post</Link>
      </Container>
    );
  }
}

export default PostList;
