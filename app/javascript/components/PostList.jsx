import React from 'react';
import PostSummary from './PostSummary';
import { List, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, onDelete } = this.props;
    return (
      <div>
        <List>
          {posts.map(post => (
            <List.Item key={post.id}>
              <PostSummary post={post} onDelete={onDelete} />
              <Divider hidden />
            </List.Item>
          ))}
        </List>
        <div>
          <Container text={true}>
            <Link to='/posts/new'>Add new post</Link>
          </Container>
        </div>
      </div>
    );
  }
}

export default PostList;
