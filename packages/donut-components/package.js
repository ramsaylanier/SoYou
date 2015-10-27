Package.describe({
  summary: 'Reusable UI Components you can sink your teeth int0',
  version: '0.0.1',
  name: 'donut-components'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use([                
    'iron:router'                   
  ]);

  // client

  api.use([
    'jquery',                   
    'underscore',                
    'templating',
    'percolate:velocityjs'        

  ], ['client']);

  api.add_files([
  //   'lib/custom_fields.js',
  //   'lib/hooks.js',
  //   'lib/main.js',
    'lib/routes.js',
  //   'lib/settings.js',
  //   'lib/templates.js',
  ], ['client', 'server']);

  // client

  api.add_files([
    'client/components/modal/donut_modal.html',
    'client/components/modal/donut_modal.js',
    'client/components/page/donut_page.html',
    'client/components/page/donut_page.js',
    'client/components/page/pageAnimations.js',
    'client/components/list/donut_list.html',
    'client/components/list/donut_list.js',
    'client/components/list/listAnimations.js', 
    'client/components/item/donut_item.html',
    'client/components/item/donut_item.js',    
    'client/components/shelf/donut_shelf.html',
    'client/components/shelf/donut_shelf.js',   
    'client/components/toggle/donut_toggle.html',
    'client/components/toggle/donut_toggle.js',   
    'client/compatibility/animations.js',
    'client/compatibility/states.js',
    'client/compatibility/helpers.js'
  ], ['client']);

  api.export([
    
  ]);

});