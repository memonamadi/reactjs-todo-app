var React = require('react');
// makes the connections between react and the data we get back from Firebase
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
// unique Firebase Url to make requests and send data
var rootUrl = 'https://torrid-heat-688.firebaseio.com/';

var App = React.createClass({
	// mixins is a group of methods that copies methods form an object (ReactFire) onto a react component
	mixins: [ ReactFire ], 
	getInitialState: function() {
	    return {
	    	items: {},
	    	loaded: false     
	    }
	},
	// renders once when app component is mounted to dom
	componentWillMount: function() {
		// creates a new instance of Firebase object and looks for the data in the url built below
		// bindAsObject: method from ReactFire that uses the Firebase url to integrate items to react items component
		this.fb = new Firebase(rootUrl + 'items/');
		this.bindAsObject(this.fb , 'items');
		// on method listens to event and as triggers the handleDataLoaded function as soon as value flows
		this.fb.on('value', this.handleDataLoaded);
	},
	render: function() {
	   	return <div className='row panel panel-default'>
	   		<div className='col-md-8 col-md-offset-2'>
	   			<h2 className='text-center'>
	   				Todo List
	   			</h2>
	   			<Header itemsStore={this.firebaseRefs.items} />
	   			<hr />
	   			<div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
	   				<List items={this.state.items} />
	   				{this.deleteButton()}
	   			</div>
	   		</div> 
	   	</div>
	},
	deleteButton: function() {
		if(!this.state.items) {
			return 
		} else {
			return <div className='text-center clear-complete'>
				<hr/>
				<button
					type='button'
					onClick={this.onDeleteDoneClick}
					className='btn btn-default'
					>
					Clear complete
				</button>
			</div>
		}
	},
	onDeleteDoneClick: function(event) {
		for(var key in this.state.items) {
			if(this.state.items[key].done === true) {
				this.fb.child(key).remove();
			}
		}
	},
	handleDataLoaded: function() {
		this.setState({loaded: true});
	}
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
