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
  $templateCache.put('html/home.html',
    '<div class="mc-page mc-users"><div class="col-1-2">Username:</div><div class="col-1-2">{{ currentUser.id }}</div><div class="col-1-2">Expected Calories:</div><input type="text" class="col-1-2" ng-model="currentUser.expectedCalories"> <input type="button" value="Save" ng-click="save(currentUser)"><br><a href="#/" title="Meals">Back To Meals</a></div>');
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
    '<form><input type="text" ng-model="meal.text"> <input type="date" ng-model="meal.timestamp"> <input type="time" ng-model="meal.timestamp"> <input type="text" ng-model="meal.calories" ng-class="{ calories_too_many: meal.calories > expectedCalories, calories_too_few: meal.calories <= expectedCalories }"> <input type="submit" ng-click="save(meal)" value="save"></form>');
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
    '<div class="mc-meals"><div class="meal-filters"><div><div class="col-1-2">Between Dates</div><div class="col-1-2">Between Times</div></div><div><input id="meal-date-start" ng-class="{mc_invalid: invalid.dstart}" type="date" class="col-1-4" ng-model="startDate" ng-change="filter()"> <input id="meal-date-end" ng-class="{mc_invalid: invalid.dend}" type="date" class="col-1-4" ng-model="endDate" ng-change="filter()"> <input id="meal-time-start" ng-class="{mc_invalid: invalid.tstart}" type="time" class="col-1-5" ng-model="startTime" ng-change="filter()"> <input id="meal-time-end" ng-class="{mc_invalid: invalid.tend}" type="time" class="col-1-5" ng-model="endTime" ng-change="filter()"></div><div><label ng-if="user.isSuper" for="own-meal-record" class="col-1-4">Own</label> <input ng-if="user.isSuper" id="own-meal-record" class="col-1-4" type="checkbox" ng-model="user.own" ng-change="filter()"> <input type="button" class="col-1-4" value="clear filters" ng-click="clearFilter()"></div></div><br><ul class="mc-meals-form"><li ng-repeat="meal in meals"><mc-meal meal="meal"></mc-meal></li></ul></div>');
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
    '<ul class="mc-user-status"><li ng-if="user"><a href="#/logout" title="log out of Meal Calories">Log Out</a> <a href="#/password" title="Change Password">Change Password</a></li><li ng-if="!user"><a href="#/login" title="login to Meal Calories">Login</a> or <a href="#/sign-up" title="sign up for Meal Calories">Sign Up</a></li><li ng-if="user && user.authority != \'regular\'"><a href="#/users" title="Meal Calories users">Manage Users</a></li><li ng-if="user"><a href="#/user" title="Home">Home/Settings</a></li></ul>');
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
    '<div><div class="col-1-5">{{ user.id }}</div><input class="col-1-5" type="text" ng-model="user.expectedCalories" value="{{ user.expectedCaloreis }}"><div class="col-1-5" ng-if="isSuper"><mc-auth-select ng-model="user"></mc-auth-select></div><div class="col-1-5" ng-if="!isSuper"><div>{{ user.authority }}</div></div><input class="col-1-5" type="button" ng-click="save(user)" value="Save"></div>');
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
    '<div class="mc-users"><ul><li ng-repeat="user in users"><mc-user mc-id="user.id"></mc-user></li></ul></div>');
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
