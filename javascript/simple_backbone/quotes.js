var Quote = Backbone.Model.extend({});

var Quotes = Backbone.PageableCollection.extend({
  model: Quote, 
  url: "https://gist.githubusercontent.com/anonymous/8f61a8733ed7fa41c4ea/raw/1e90fd2741bb6310582e3822f59927eb535f6c73/quotes.json",
  state: {
    pageSize: 15
  },
  mode: "client"
});

var quotes = new Quotes();

var columns = [{
    name: "quote", 
    label: "Quote",
    cell: "string",
    editable: false
  }, {
    name: "context", 
    label: "Context",
    cell: "string", 
    editable: false
  }, {
    name: "source", 
    label: "Source",
    cell: "string", 
    editable: false
  }, {
    name: "theme", 
    label: "Theme",
    cell: "string", 
    editable: false
}];

var grid = new Backgrid.Grid({
  columns: columns,
  collection: quotes
});

var quoteGrid = $("#quote-list");
quoteGrid.append(grid.render().el);

var paginator = new Backgrid.Extension.Paginator({
  collection: quotes
});

quoteGrid.after(paginator.render().el);

var quoteFilter = new Backgrid.Extension.ClientSideFilter({
  collection: quotes,
  placeholder: "Search quote text",
  fields: ['quote'],
  wait: 150
});

quoteGrid.prepend(quoteFilter.render().el);

var filter = new Backgrid.Extension.SelectFilter({
      className: "backgrid-filter form-control",
      collection: quotes,
      field: "theme",
      selectOptions: [{
        label: "All", value: null
      }, {
        label: "Movies", value: ["movies"]
      }, {
        label: "Games", value: ["games"]
      }],
      makeMatcher: function(value) {
        return function(model) {
        return _.indexOf(value, model.get(this.field)) >= 0;
        }
      }
});
      
  $filter = filter.render().$el;
  $("#select-filter").replaceWith($filter);
 
quotes.fetch({reset: true}); 




