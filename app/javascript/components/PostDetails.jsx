import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostDetails extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		const postId = this.props.match.params.postId;
		const post = this.props.posts.find((el) => (el.id === parseInt(postId)));
    return (
      <div>
      	{post ?
	        (<Container text>
	          	<Header as='h2' dividing>{post.title}</Header>
		          <p>{post.description}</p>
		          <div>
		            <Grid>
		              <Grid.Column floated='left' width={6}>
		                <Link to={`/posts`}>
		                  Go back
		                </Link>
		              </Grid.Column>
		            </Grid>
		          </div>
	        </Container>)
	        : (<Container text>Loading...</Container>)
      	}
      </div>
    );
  }
}

export default PostDetails;