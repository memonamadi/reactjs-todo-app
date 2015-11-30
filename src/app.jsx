var React = require('react');
// makes the connections between react and the data we get back from Firebase
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
// unique Firebase Url to make requests and send data
var rootUrl = 'https://torrid-heat-688.firebaseio.com/';

var App = React.createClass({
	// mixin is a group of methods that copy code form an object (ReactFire) onto a component
	mixins: [ ReactFire ], 
	getInitialState: function() {
	    return {
	    	items: {}     
	    }
	},
	// renders once
	componentWillMount: function() {
		// creates a new instance of Firebase object and looks for the data in the url built below
		// bindAsObject: method from ReactFire that uses the Firebase url
		this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
	},
	render: function() {
	   	return <div className='row panel panel-default'>
	   		<div className='col-md-8 col-md-offset-2'>
	   			<h2 className='text-center'>
	   				Todo List
	   			</h2>
	   			<Header itemsStore={this.firebaseRefs.items} />
	   			<List items={this.state.items} />
	   		</div> 
	   	</div>
	}
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
