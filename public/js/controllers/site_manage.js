/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 14-1-2
 * Time: 上午10:38
 * To change this template use File | Settings | File Templates.
 */
function SitesController($scope, $http){

    $scope.owner_rev;
    $scope.telephone_rev;
    $scope.email_rev;
    $scope.address_rev;

    $scope.fill_value = function() {
        $http({
            url: '/site_manage',
            method: 'GET'
        }).success(function(data, status, headers, config) {

                if (data.length == 0){
                    $scope.owner_rev="";
                    $scope.telephone_rev="";
                    $scope.email_rev="";
                    $scope.address_rev="";

                } else {
                    $scope.owner_rev=data.owner;
                    $scope.telephone_rev=data.telephone;
                    $scope.email_rev=data.email;
                    $scope.address_rev=data.address;
                }
            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });
    }
}