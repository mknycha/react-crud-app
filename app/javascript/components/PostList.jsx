import React from 'react';
import PostSummary from './PostSummary';
import { List, Divider } from 'semantic-ui-react';

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;
    return (
      <List>
        {posts.map(post => (
          <List.Item key={post.id}>
            <PostSummary post={post} />
            <Divider hidden />
          </List.Item>
        ))}
      </List>
    );
  }
}

export default PostList;
