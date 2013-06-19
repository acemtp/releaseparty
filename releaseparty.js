function now() {
  return new Date().getTime();
}

if (Meteor.isClient) {

  Meteor.startup(function () {
  });

  Template.subscribe.events({
    'click #btn' : function () {
      Meteor.call('subscribe', $('#email').val(), function (error, result) {
        if(result !== '') Session.set('error', result);
        else Session.set('subscribed', true);
      });
    }
  });

  Template.subscribe.error = function() {
    return Session.get('error');
  }

  Template.subscribe.subscribed = function() {
    return Session.equals('subscribed', true);
  }

}

Meteor.methods({
  subscribe: function(email) {
    if (email == '') {
      return 'Please enter your email';
    }
    if(email.indexOf('@') === -1) {
      return 'Please enter a valid email';
    }
    if(email.length < 3) {
      return 'Please enter a valid email';
    }

    if (Meteor.isServer)
      console.log('insert', email);
//      Subscribers.insert({email:email, createdAt: now()});
    return '';
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
