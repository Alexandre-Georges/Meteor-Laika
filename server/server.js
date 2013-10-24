'use strict'

Meteor.startup(function () {
});

Meteor.publish('collectionB', function() {
    return CollectionB.find({ colA: "a" });
});

Meteor.methods(
    {
        methodA: function(input) {
            return input * 2;
        }
    }
);