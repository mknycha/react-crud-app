import React from 'react'

class PostDetails extends React.Component {
	render() {
		let { title, description, created_at } = this.props.post
	  return (
	  	<div>
		    <strong>{title}</strong>
		    <div>{description}</div>
				<div>Added: {created_at}</div>
	    </div>
	  )
	}
}

export default PostDetails