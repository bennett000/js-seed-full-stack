(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/auth-select.html',
    '<div class="mc-authority-field"><label ng-if="currentUser">Authority</label><select ng-if="currentUser" ng-model="ngModel.authority"><option ng-repeat="a in authorities" value="{{ a }}">{{ a }}</option></select></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/change-password.html',
    '<form novalidate="" class="mc-change-password-form"><div class="mc-change-password-error" ng-show="result.error">{{ result.error }}</div><div class="mc-change-password-success" ng-show="result.success">{{ result.success }}</div><div><label for="password" class="col-1-2">Password</label> <input type="password" class="col-1-2" id="password" ng-model="user.password" required=""> <label for="passwordNew" class="col-1-2">New Password</label> <input type="password" class="col-1-2" id="passwordNew" ng-model="user.passwordNew" required=""> <label for="passwordConfirm" class="col-1-2">Confirm Password</label> <input type="password" class="col-1-2" id="passwordConfirm" ng-model="user.passwordConfirm" mc-compare-to="user.passwordNew" required=""></div><input id="mc-button-change-pass" type="submit" ng-click="changePassword(user)" value="Change"></form>');
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
    '<form novalidate="" class="mc-login-form"><div class="mc-login-error" ng-show="result.error">{{ result.error }}</div><div><label for="username" class="col-1-2">Username</label> <input type="text" class="col-1-2" id="username" ng-model="user.username" required=""> <label for="password" class="col-1-2">Password</label> <input type="password" class="col-1-2" id="password" ng-model="user.password" required=""></div><input id="mc-button-login" type="submit" ng-click="login(user)" value="Login"> <a class="mc-login-new-user-link" href="/#/sign-up" title="Create New User">Create New User</a></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/meal.html',
    '<form><input type="text" ng-model="meal.text"> <input type="date" ng-model="meal.timestamp"> <input type="time" ng-model="meal.timestamp"> <input type="text" ng-model="meal.calories" ng-class="{ calories_too_many: meal.calories >= expectedCalories, calories_too_few: meal.calories < expectedCalories }"> <input type="submit" ng-click="save(meal)" value="save"></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/meals.html',
    '<ul class="mc-meals-form"><li>Start <input ng-class="{mc_invalid: invalid.dstart}" type="date" ng-model="startDate" ng-change="filter()"> End <input ng-class="{mc_invalid: invalid.dend}" type="date" ng-model="endDate" ng-change="filter()"></li><li>Start <input ng-class="{mc_invalid: invalid.tstart}" type="time" ng-model="startTime" ng-change="filter()"></li><li>End <input ng-class="{mc_invalid: invalid.tend}" type="time" ng-model="endTime" ng-change="filter()"></li><li><input type="button" value="clear filters" ng-click="clearFilter()"></li><li ng-repeat="meal in meals"><mc-meal meal="meal"></mc-meal></li></ul>');
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
    '<form novalidate="" class="mc-new-user-form"><div class="mc-new-user-error" ng-show="result.error">{{ result.error }}</div><div class="mc-new-user-success" ng-show="result.success">{{ result.success }}</div><div class="mc-username-field"><label for="username" class="col-1-2">Username</label> <input type="text" class="col-1-2" id="username" ng-model="user.username" required=""> <label for="password" class="col-1-2">Password</label> <input type="password" class="col-1-2" id="password" ng-model="user.password" required=""> <label for="passwordConfirm" class="col-1-2">Confirm Password</label> <input type="password" class="col-1-2" id="passwordConfirm" ng-model="user.passwordConfirm" mc-compare-to="user.password" required=""></div><mc-auth-select ng-model="user"></mc-auth-select><div class="mc-new-user-button">Already Signed Up? <a href="#/login" title="Login">Log In</a> <input id="mc-button-sign-up" type="submit" ng-click="newUser(user)" value="Sign Up"></div></form>');
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
    '<div><div>{{ user.id }}</div><form><input type="text" ng-model="user.expectedCalories" value="{{ user.expectedCaloreis }}"></form><div>{{ user.authority }}</div></div>');
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

(function(module) {
try {
  module = angular.module('MealCalories');
} catch (e) {
  module = angular.module('MealCalories', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('html/welcome.html',
    '<div class="mc-welcome mc-page"><h1 class="mc-welcome-title">Welcome To Meal Calories</h1><div class="mc-welcome-options"><a href="#/login" title="Log In">Log In</a> or <a href="#/sign-up" title="Sign Up">Sign Up</a></div></div>');
}]);
})();
