import React from "react";
import PostForm from "./PostForm";
import PropTypes from "prop-types";

class PostEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  async componentDidMount() {
    const { postId, findPost } = this.props;
    const post = await findPost(postId);
    this.setState({
      post: post
    });
  }

  render() {
    const post = this.state.post;
    if (post) {
      return (
        <PostForm {...this.props} post={this.state.post} header="Edit post" />
      );
    }
    return null;
  }
}

PostEditForm.propTypes = {
  postId: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  findPost: PropTypes.func.isRequired,
};

export default PostEditForm;
