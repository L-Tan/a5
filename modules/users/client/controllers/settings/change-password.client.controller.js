'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication',
    'PasswordValidator', 'AuthenticationService',
    function ($scope, $http, Authentication, PasswordValidator, AuthenticationService) {
        $scope.user = Authentication.user;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();

        // Change user password
        $scope.changeUserPassword = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'passwordForm');

                return false;
            }
            AuthenticationService.changePassword($scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.$broadcast('show-errors-reset', 'passwordForm');
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
