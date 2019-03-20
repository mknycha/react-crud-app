import React from 'react';
import PostList from './PostList';
import { Header, Divider } from 'semantic-ui-react';

const App = () => (
  <div>
  	<Header as='h1' color='green' textAlign='center' dividing>
  		Awesome blog
  	</Header>
  	<div>
	  	<Divider hidden/>
    	<PostList />
    </div>
  </div>
);

export default App;
