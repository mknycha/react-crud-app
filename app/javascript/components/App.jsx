import React from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import { Header, Divider } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
			  		<Route path='/posts/:postId'
			  					 render={props => <PostDetails {...props} posts={this.state.posts} />}
			  					 />
			    </Router>
		    </div>
		  </div>
  	)
  }
}

export default App;
