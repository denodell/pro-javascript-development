var App = Ember.Application.create(),
    dataSource;

$.ajax({
    url: '../out/data.json',
    async: false,
    success: function(json) {
        dataSource = json;
    }
});

console.log(dataSource);

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return dataSource.classitems;
  }
});
