(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/login.html',
    '<form novalidate="" class="mc-login-form"><div class="mc-login-error" ng-show="result.error">{{ result.error }}</div><div class="mc-username-field"><label for="username">Username</label> <input type="text" id="username" ng-model="user.username" required=""></div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-login-button"><input type="submit" ng-click="login(user)" value="Login"></div><a class="mc-login-new-user-link" href="/#/new-user" title="Create New User">Create New User</a></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/new-user.html',
    '<form novalidate="" class="mc-new-user-form"><div class="mc-new-user-error" ng-show="result.error">{{ result.error }}</div><div class="mc-username-field"><label for="username">Username</label> <input type="text" id="username" ng-model="user.username" required=""></div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-password-field"><label for="passwordConfirm">Password</label> <input type="password" id="passwordConfirm" ng-model="user.passwordConfirm" mc-compare-to="user.password" required=""></div><div class="mc-new-user-button"><input type="submit" ng-click="newUser(user)" value="Sign Up"></div></form>');
}]);
})();
