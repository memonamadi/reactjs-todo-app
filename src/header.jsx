var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	// when component first render, {this.state.text} is a empty string
	        text: ''  
	    }
	},
	render: function() {
		// onChange: when user enters value in input that triggers the event handleInputChange
		return <div className='input-group'>
			<input 
				value={this.state.text}
				onChange={this.handleInputChange}
				type='text' 
				className='form-control' />
			<span className='input-group-btn'>
				<button 
					onClick={this.handleClick}
					className='btn btn-default' 
					type='button'>
					Add
				</button>
			</span>
		</div>
	},
	handleClick: function() {
		// Send value of text input to Firebase whenever user clicks add button
		// When we push to Firebase we ask Firebase to add the new data to the database
		this.props.itemsStore.push({
			// text key saves the value of text to save
			text: this.state.text,
			// done represents wether the todo has been done yet
			done: false
		});
		// clears out the text in the input field after sending the value to Firebase
		this.setState({text: ''});
	},
	// as user starts typing we update the value of {this.state.text} with value being entered by user
	handleInputChange: function(event) {
		this.setState({text: event.target.value});
	}
});