import React from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import { Header, Divider } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

  render() {
    return (
      <div>
        <Header as='h1' color='green' textAlign='center' dividing>
          Awesome blog
        </Header>
        <Divider hidden/>
        <div>
          <Router>
            <Route exact={true}
                   path='/posts'
                   render={props => <PostList {...props} posts={this.state.posts} />}
                   />
            <Switch>
              <Route path='/posts/new'
                     component={PostForm}
                     />
              <Route path={`/posts/:postId`}
                     render={({ match }) => {
                       const postId = match.params.postId;
                       const post = this.state.posts.find((el) => (el.id === parseInt(postId)));
                       return (<PostDetails post={post} />);
                     }}
                     />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App;
