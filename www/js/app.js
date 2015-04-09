angular.module('drupalLacesApp', [])
  .controller('DrupalStructController', function () {
    var drupalStruct = this;
    drupalStruct.contentTypes = [
      {typeTitle: 'Article', machineName: 'article', selected: false, fields: []},
      {typeTitle: 'Page', machineName: 'page', selected: false, fields: []}
    ];
    drupalStruct.taxonomies = [
      {taxName: 'Tags', machineName: 'tags', selected: false, fields: []}
    ];
 
    drupalStruct.addTodo = function (type) {
      if (type == 'ctype') {
        drupalStruct.contentTypes.push({
          typeTitle: drupalStruct.typeName, 
          machineName: drupalStruct.convrtToMachineName(drupalStruct.typeName), 
          selected: false, 
          fields: []
        });
      }
      else if (type == 'taxonomy') {
        drupalStruct.taxonomies.push({
          taxName: drupalStruct.typeName, 
          machineName: drupalStruct.convertToMachineName(drupalStruct.typeName), 
          selected: false, 
          fields: []
        });
      }
      drupalStruct.typeName = '';
    };
 
    drupalStruct.convertToMachineName = function (title) {
      return title.replace(' ', '_').replace('  ', ' ').toLower();
    };
    drupalStruct.remaining = function () {
      var count = 0;
      angular.forEach(drupalStruct.contentTypes, function(contentType) {
        count += contentType.selected ? 0 : 1;
      });
      return count;
    };
 
    drupalStruct.archive = function () {
      var oldTypes = drupalStruct.contentTypes;
      drupalStruct.contentTypes = [];
      angular.forEach(oldTypes, function(contentType) {
        if (!contentType.selected) drupalStruct.contentTypes.push(contentType);
      });
      var oldTaxonomies = drupalStruct.taxonomies;
      drupalStruct.contentTypes = [];
      angular.forEach(oldTaxonomies, function(taxonomy) {
        if (!taxonomy.selected) drupalStruct.contentTypes.push(taxonomy);
      });
    };
  });