var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localStorage');


var Shirt = Backbone.Model.extend({
});

var ShirtCollection = Backbone.Collection.extend({
  model: Shirt
});

var CartCollection = Backbone.Collection.extend({
  model: Shirt,
  localStorage: new Backbone.LocalStorage("CartCollection"),
});

module.exports = {
  'ShirtCollection': ShirtCollection,
  'CartCollection': CartCollection
}
