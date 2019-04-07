import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Header, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./PostSummary.css";

class PostSummary extends React.Component {
  render() {
    const { id, title, content, created_at } = this.props.post;
    return (
      <div>
        <Container text className="box-container">
          <Header as="h2" dividing>
            {title}
          </Header>
          <p className="block-with-text">{content}</p>
          <Grid>
            <Grid.Column floated="left" width={4}>
              <Link to={`/posts/${id}`}>Read more</Link>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              Added: {dateParser(created_at)}
            </Grid.Column>
          </Grid>
          <div>
            <Button
              color="green"
              onClick={() => this.props.history.push(`/posts/${id}/edit`)}
            >
              Edit
            </Button>
            <Button
              color="red"
              onClick={() => this.props.onDelete(id)}>Delete</Button>
          </div>
        </Container>
      </div>
    );
  }
}

PostSummary.defaultProps = {
  title: "",
  content: "",
  created_at: new Date()
};

PostSummary.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.instanceOf(Date)
};

function dateParser(dateString) {
  let dateInMs = Date.parse(dateString);
  let parsedDate = new Date(dateInMs);
  return parsedDate.toLocaleDateString("en-US");
}

export default PostSummary;
