(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/login.html',
    '<form novalidate="" class="mc-login-form"><div class="mc-login-error" ng-show="badLogin.error">{{ badLogin.error }}</div><div class="mc-username-field"><label for="username">Username</label> <input type="text" id="username" ng-model="user.username" required=""></div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-login-button"><input type="submit" ng-click="login(user)" value="Login"></div></form>');
}]);
})();
