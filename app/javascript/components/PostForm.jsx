import React from 'react';
import { Form, Button, Container, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmptyObject, validatePost } from '../helpers/helpers';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      errors: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { post } = this.state;
    const errors = validatePost(post);
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      console.log(post);
    }
  }

  handleInputChange = (post) => {
    const { target } = post;
    const { name } = target;
    const value = target.value;

    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [name]: value,
      },
    }));
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div>
        {Object.values(errors).map(error => (
          <Message
            key={error}
            error
            content={error}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <Container>
        <h2>New post</h2>
        {this.renderErrors()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input name='title' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.TextArea name='content' label='Content' onChange={this.handleInputChange} />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.shape(),
};

PostForm.defaultProps = {
  post: {
    title: '',
    content: '',
  },
};

export default PostForm;
