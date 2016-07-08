var React = require('react');
var Cookies = require('js-cookie');

var collectionShirt = require('../models/shirts').ShirtCollection;
var collectionCart = require('../models/shirts').CartCollection;



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
      <div className="col-md-6 top-bar">
        <h4 className="title-bar">D9 Classy Hound T-shirts Shop</h4>
        <div className="display-button"><a href="#">T-shirts</a></div>
        <div className="display-button"><a href="#">Cart</a></div>
        <form onSubmit={this.props.handleLogin} className="login-box">
          <input onChange={this.handleUsernameChange} value={this.state.username} name="username" type="text" placeholder="Enter your user name..." className="login-button" />
          <button className="btn btn-primary btn-xs">Login</button>
          <span id="reg-link">Not registered? <a href="#">Sign up!</a></span>
        </form>
      </div>
    )
  }
});

var ShirtList = React.createClass({
  render: function(){
    var shirts = this.props.shirtCollection.map(function(shirtmodel){
      return
      <li key={shirtModel.cid}>
        {shirtModel.get('image')},
        {shirtModel.get('name')},
        {shirtModel.get('price')}
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
    var shirtCollection = new collectionShirt();
    var cartCollection = new collectionCart();

    shirtCollection.add([
      {image: '../../images/T-shirt_Image_10.jpg', name: 'Redhead Shirt', price: 10000},
      {image: '../../images/T-shirt_Image_15.jpg', name: 'Bad Boy Shirt', price: 15000},
      {image: '../../images/T-shirt_Image_04.jpg', name: 'Rolling Stones "We Old" 2016 Tour Shirt', price: 21000}
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
  // handleShirtDiplay: function(){
  //   e.preventDefault();
  //   this.props.handleShirtDiplay(this.state.)
  // }
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
