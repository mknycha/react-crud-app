import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Grid } from 'semantic-ui-react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';

class PostSummary extends React.Component {
  render() {
    const { id, title, content, created_at } = this.props.post;
    return (
      <div>
        <Container text>
          <Header as='h2' dividing>{title}</Header>
          <LinesEllipsis
            text={content}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
            component='p'
          />
          <div>
            <Grid>
              <Grid.Column floated='left' width={3}>
                <Link to={`/posts/${id}`}>
                  Read more
                </Link>
              </Grid.Column>
              <Grid.Column floated='left' width={4}>
                <Button onClick={() => this.props.onDelete(id)}>
                  Delete
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                Added: {dateParser(created_at)}
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

PostSummary.defaultProps = {
  title: '',
  content: '',
  created_at: new Date(),
};

PostSummary.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
};

function dateParser(dateString) {
  let dateInMs = Date.parse(dateString);
  let parsedDate = new Date(dateInMs);
  return parsedDate.toLocaleDateString("en-US");
}

export default PostSummary;
