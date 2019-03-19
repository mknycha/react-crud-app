import React from 'react';
import PropTypes from 'prop-types';

class PostDetails extends React.Component {
  render() {
    const { title, description, created_at } = this.props.post;
    return (
      <div>
        <strong>{title}</strong>
        <div>{description}</div>
        <div>
Added:
          {created_at}
        </div>
      </div>
    );
  }
}

PostDetails.defaultProps = {
  title: '',
  description: '',
  created_at: '',
};

PostDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
};

export default PostDetails;
