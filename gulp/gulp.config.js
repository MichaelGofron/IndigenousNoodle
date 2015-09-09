module.exports = {
  build_dir: 'build',

  app_files: {
    js: ['public/**/*.js', 'server/**/*.js', '!public/lib/**/*'],
    tpl_src: ['./build/public/lib/angular/angular.min.js',
      './build/public/lib/angular-mocks/angular-mocks.js',
      './build/public/lib/angular-animate/angular-animate.min.js',
      './build/public/lib/webcomponentsjs/webcomponents-lite.min.js',
      './build/public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './build/public/lib/angular-ui-router/release/angular-ui-router.min.js',
      './build/public/signupLogin/signupLoginController.js',
      './build/public/factories/factories.js',
      './build/public/app.js',
      './build/public/services/data.service.js',
      './build/public/services/attachTokenService.js',
      './build/public/services/eventsService.js',
      './build/public/services/signupLoginService.js',
      './build/public/services/usersAndEventsService.js',
      './build/public/services/usersService.js',
      './build/public/components/navBar/navBarDirective.js',
      './build/public/homepage/homepageController.js',
      './build/public/eventDetailPage/eventDetailController.js',
      './build/public/eventListPage/eventListController.js',
      './build/public/createEventPage/createEventController.js',
      './build/public/eventManager/eventManagerController.js',
      './build/public/profilePage/profilePageController.js',
      './build/public/eventManager/eventManagerJoinedController.js',
      './build/public/eventManager/eventManagerHostedController.js',
      './build/public/userProfile/userProfileController.js',
      './build/public/lib/iron-icons/iron-icons.html',
      './build/public/lib/iron-icon/iron-icon.html',
      './build/public/lib/paper-button/paper-button.html', 
      './build/public/lib/paper-icon-button/paper-icon-button.html', 
      './build/public/lib/paper-input/all-imports.html', 
      './build/public/lib/iron-input/iron-input.html', 
      './build/public/lib/polymer/polymer.html', 
      './build/public/assets/css/**/*.css', 
      './build/public/lib/bootstrap/dist/css/bootstrap.min.css']
  }
};