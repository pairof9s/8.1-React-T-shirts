var React = require('react');
var Cookies = require('js-cookie');

var collections = require('../models/shirts').ShirtCollection;



var UsernameBar = React.createClass({
  getInitialState: function(){
    return {username: ''}
  },
  handleUsernameChange: function(){
    this.setState({username: e.target.value})
  },
  handleLogin: function(){
    e.preventDefault();
    this.props.handleLogin(this.state.username);
  },
  render: function(){
    return (
      <form onSubmit={this.props.handleLogin}>
        <input onChange={this.handleUsernameChange} value={this.state.username} name="username" type="text" /><button>Submit</button>
      </form>
    )
  }
});

var ShirtList = React.createClass({
  render: function(){
    var shirts = this.props.shirtCollection.map(function(shirtmodel){
      return
      <li key={shirtModel.cid}>
        {shirtModel.get('name')}
        <button onClick={function(){this.props.addToCart(shirtModel)}}>Add to Cart</button>
      </li>
    });

    return(
      <ul>
        {shirts}
      </ul>
    )
  }
});

var AppContainer = React.createClass({
  getInitialState: function(){
    var username = Cookies.get('username');
    var shirtCollection = new collections.ShirtCollection();
    var cartCollection = new collections.CartCollection();

    shirtCollection.add([
      {name: 'Redhead Shirt', price: 10000},
      {name: 'Bad Boy Shirt', price: 15000},
      {name: 'U2 "We Old" 2016 Tour Shirt', price: 21000}
    ])

    return {username: username ? username : '',
      shirtCollection: shirtCollection,
      cartCollection: cartCollection
    };
  },
  handleLogin: function(username){
    Cookies.set('username', username);
    this.setState({username: username});
  },
  addToCart: function(shirtModel){
    var collection = this.state.cartCollection;
    collection.add(shirtModel);
    collection.sync();

    localStorage.setItem('cartCollection', JSON.stringify(collection.toJSON()));
  },
  render: function(){
    var username = this.state.username;
    var loginBar = this.state.username ? this.state.username : <UsernameBar username={this.state.username} handleLogin={this.handleLogin}/>
    return (
      <div>
        {loginBar}
      </div>
    )
  }
});

module.exports = AppContainer;
