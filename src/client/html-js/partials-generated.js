(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/change-password.html',
    '<form novalidate="" class="mc-change-password-form"><div class="mc-change-password-error" ng-show="result.error">{{ result.error }}</div><div class="mc-change-password-success" ng-show="result.success">{{ result.success }}</div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-password-new-field"><label for="passwordNew">New Password</label> <input type="password" id="passwordNew" ng-model="user.passwordNew" required=""></div><div class="mc-password-field"><label for="passwordConfirm">Confirm Password</label> <input type="password" id="passwordConfirm" ng-model="user.passwordConfirm" mc-compare-to="user.passwordNew" required=""></div><div class="mc-change-password-button"><input id="mc-button-change-pass" type="submit" ng-click="changePassword(user)" value="Change"></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/login.html',
    '<form novalidate="" class="mc-login-form"><div class="mc-login-error" ng-show="result.error">{{ result.error }}</div><div class="mc-username-field"><label for="username">Username</label> <input type="text" id="username" ng-model="user.username" required=""></div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-login-button"><input id="mc-button-login" type="submit" ng-click="login(user)" value="Login"></div><a class="mc-login-new-user-link" href="/#/sign-up" title="Create New User">Create New User</a></form>');
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
    '<form novalidate="" class="mc-new-user-form"><div class="mc-new-user-error" ng-show="result.error">{{ result.error }}</div><div class="mc-new-user-success" ng-show="result.success">{{ result.success }}</div><div class="mc-username-field"><label for="username">Username</label> <input type="text" id="username" ng-model="user.username" required=""></div><div class="mc-password-field"><label for="password">Password</label> <input type="password" id="password" ng-model="user.password" required=""></div><div class="mc-password-field"><label for="passwordConfirm">Confirm Password</label> <input type="password" id="passwordConfirm" ng-model="user.passwordConfirm" mc-compare-to="user.password" required=""></div><div class="mc-authority-field" ng-if="currentUser"><label for="authority">Authority</label><select id="authority" ng-model="user.authority"><option ng-repeat="a in authorities" value="{{ a }}">{{ a }}</option></select></div><div class="mc-new-user-button"><input id="mc-button-sign-up" type="submit" ng-click="newUser(user)" value="Sign Up"></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/user-status.html',
    '<ul class="mc-user-status"><li ng-if="user"><a href="#/logout" title="log out of Meal Calories">Log Out</a> <a href="#/password" title="Change Password">Change Password</a></li><li ng-if="!user"><a href="#/login" title="login to Meal Calories">Login</a> or <a href="#/sign-up" title="sign up for Meal Calories">Sign Up</a></li><li ng-if="user && user.authority != \'regular\'"><a href="#/users" title="Meal Calories users">Manage Users</a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/user.html',
    '<div><div>{{ user.id }}</div><div>{{ user.authority }}</div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/users.html',
    '<ul><li ng-repeat="user in users"><mc-user mc-id="user.id"></mc-user></li></ul>');
}]);
})();
