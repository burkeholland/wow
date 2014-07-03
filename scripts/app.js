(function () {
   
  var emulator = true;  

  // window.onerror = function (msg, url, line) {
  //   alert(msg);
  // };

  var app,
      el = new Everlive('UWGnnSN4WrhWlNLz');

  window.APP = {
    models: {
      login: {
        signup: function (e) {
          // app.navigate('views/signup.html', 'slide');
          app.navigate('views/access.html', 'overlay:up');
        }
      },
      signup: {
        username: '',
        password: '',
        back: function (e) {
          app.navigate('#:back');
        },
        upper: function (e) {
          var field = $(e.currentTarget).data('upper');
          var modelField = this.get(field);
          this.set(field, modelField.toUpperCase());
        },
        signup: function (e) {
          el.Users.register(
            this.get('username'), 
            this.get('password'),
            function (data) {
              app.navigate('views/access.html', 'overlay: up');
            },
            function (error) {
              console.log('fail');
              console.log(error);
            }
          );
        }
      },
      access: {
        allow: function (e) {
          var device = el.push.currentDevice();
          device.enableNotifications({
            iOS: {
              badge: true,
              sound: true,
              alert: true,
            },
            notificationCallbackIOS: function (e) {
              alert('Got One!');
            }
          },
          function (success) {
            console.log(success);
          },
          function (error) {
            console.log(error);
          });
        }
      }
    },
    events: {
      inflate: function (e) {
        $(e.view.wrapper).fitText();
      },
      login: {
        show: function () {
          // navigator.notification.alert('In Wow, everything is tappable. Tap anywhere to see what happens. Seriously, as if you weren\'t going to do that anyway', null, 'Wow!', 'Got it!');
        }
      }
    }
  };


  document.addEventListener('deviceready', function () {

    navigator.splashscreen.hide();

    app = new kendo.mobile.Application(document.body, { 
      skin: 'flat',
      initial: 'views/login.html'
    });

  });
    
})();