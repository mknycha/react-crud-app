import React from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import { Header, Divider } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch('/api/posts.json')
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            posts: res,
          });
        },
      );
  }

  addPost = (newPost) => {
    fetch('/api/posts.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    }).then(res => res.json())
    .then((response) => {
      alert('Event Added!');
      const savedPost = response;
      this.setState(prevState => ({
        posts: [...prevState.posts, savedPost],
      }));
      const { history } = this.props;
      history.push(`/posts/${savedPost.id}`);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    return (
      <div>
        <Header as='h1' color='green' textAlign='center' dividing>
          Awesome blog
        </Header>
        <Divider hidden/>
        <div>
          <Route exact={true}
                 path='/posts'
                 render={props => <PostList {...props} posts={this.state.posts} />}
                 />
          <Switch>
            <Route path='/posts/new'
                   render={props => <PostForm {...props} onSubmit={this.addPost} />}
                   />
            <Route path={`/posts/:postId`}
                   render={(props) => <PostDetails {...props} postId={props.match.params.postId} />}
                   />
          </Switch>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  history: PropTypes.shape(),
};

export default App;
