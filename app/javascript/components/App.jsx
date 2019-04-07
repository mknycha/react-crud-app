import React from "react";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import PostForm from "./PostForm";
import PostEditForm from "./PostEditForm";
import { Header, Divider } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    let res = await fetch("/api/posts.json").then(res => res.json());
    this.setState({
      posts: res
    });
  }

  addPost = newPost => {
    fetch("/api/posts.json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(response => {
        alert("Event Added!");
        const savedPost = response;
        this.setState(prevState => ({
          posts: [...prevState.posts, savedPost]
        }));
        const { history } = this.props;
        history.push(`/posts/${savedPost.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updatePost = postToUpdate => {
    fetch(`/api/posts/${postToUpdate.id}.json`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postToUpdate)
    })
      .then(res => res.json())
      .then(response => {
        alert("Event Updated!");
        const updatedPost = response;
        const postIndex = this.state.posts.findIndex(
          post => post.id === updatedPost.id
        );
        this.setState(prevState => {
          prevState.posts[postIndex] = updatedPost;
          return { posts: prevState.posts };
        });
        const { history } = this.props;
        history.push(`/posts`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  deletePost = postId => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      fetch(`/api/posts/${postId}.json`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 204) {
            alert("Event deleted!");
            let { posts } = this.state;
            this.setState({
              posts: posts.filter(post => post.id !== postId)
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  findPost = postId => {
    return fetch(`/api/posts/${postId}.json`).then(res => res.json());
  };

  render() {
    return (
      <div>
        <Header as="h1" color="green" textAlign="center" dividing>
          Awesome blog
        </Header>
        <Divider hidden />
        <div>
          <Route
            exact={true}
            path="/posts"
            render={props => (
              <PostList
                {...props}
                posts={this.state.posts}
                onDelete={this.deletePost}
              />
            )}
          />
          <Switch>
            <Route
              path="/posts/new"
              render={props => (
                <PostForm
                  {...props}
                  onSubmit={this.addPost}
                  header="New post"
                />
              )}
            />
            <Route
              exact={true}
              path={`/posts/:postId`}
              render={props => (
                <PostDetails
                  {...props}
                  postId={props.match.params.postId}
                  findPost={this.findPost}
                />
              )}
            />
            <Route
              path={`/posts/:postId/edit`}
              render={props => {
                return (
                  <PostEditForm
                    {...props}
                    onSubmit={this.updatePost}
                    postId={Number(props.match.params.postId)}
                    findPost={this.findPost}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape()
};

export default App;
