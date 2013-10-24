'use strict'

Template.hello.greeting = function () {
return "Welcome to test.";
};

Template.hello.events(
    {
        'click input' : function () {
          // template data, if any, is available in 'this'
          if (typeof console !== 'undefined')
            console.log("You pressed the button");
        }
    }
);

Meteor.subscribe('collectionB');

Template.hello.result = function() {
    return Session.get("resultServer");
};

Meteor.call('methodA', 1, function(error, resultServer) {
    Session.set("resultServer", resultServer);
});
