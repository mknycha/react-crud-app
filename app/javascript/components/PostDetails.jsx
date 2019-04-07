import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  async componentDidMount() {
    try {
      const { postId, findPost } = this.props;
      const post = await findPost(postId);
      this.setState({
        post: post
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        {post ? (
          post.error ? (
            <Container text>{post.error}</Container>
          ) : (
            <Container text>
              <Header as="h2" dividing>
                {post.title}
              </Header>
              <p>{post.content}</p>
              <div>
                <Grid>
                  <Grid.Column floated="left" width={6}>
                    <Link to={`/posts`}>Go back</Link>
                  </Grid.Column>
                </Grid>
              </div>
            </Container>
          )
        ) : (
          <Container text>Loading...</Container>
        )}
      </div>
    );
  }
}

export default PostDetails;
