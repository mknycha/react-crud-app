import React from "react";
import { Form, Button, Container, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { isEmptyObject, validatePost } from "../helpers/helpers";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    const { header, post } = props;
    this.state = {
      header: header,
      post: post,
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { post } = this.state;
    const errors = validatePost(post);
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(post);
    }
  };

  handleInputChange = post => {
    const { target } = post;
    const { name } = target;
    const value = target.value;

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [name]: value
      }
    }));
  };

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div>
        {Object.values(errors).map(error => (
          <Message key={error} error content={error} />
        ))}
      </div>
    );
  }

  render() {
    const { post, header } = this.state
    return (
      <Container>
        <h2>{header}</h2>
        {this.renderErrors()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Title"
            name="title"
            onChange={this.handleInputChange}
            value={post.title}
          />
          <Form.TextArea
            name="content"
            label="Content"
            onChange={this.handleInputChange}
            value={post.content}
          />
          <Form.Input
            label="Author"
            name="author"
            onChange={this.handleInputChange}
            value={post.author}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired
};

PostForm.defaultProps = {
  post: {
    title: "",
    content: "",
    author: ""
  },
  header: "New post"
};

export default PostForm;
