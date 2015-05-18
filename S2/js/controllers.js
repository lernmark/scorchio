var app = angular.module("weatherApp", []);

//Här räknar man ut en massa saker och styr logik.

app.controller("weatherCtrl", function($scope, $http) {

    $scope.init = function() {
        $scope.customers($scope,$http);
    };
    
    
    $scope.customers = function($scope,$http) {
        $http.get("data.json").success(function(response) {
            $scope.timeseries = response.timeseries;
            
        });
    }    
    
    
    $scope.windDirection = function(item) {
        console.log(item);
        var n = item.wd;
        var dir = ""
        if (n>22 && n<68) {
          dir = "NO"
        } else if (n>67 && n<113) {
          dir = "O&nbsp;"
        } else if (n>112 && n<158) {
          dir = "SO"
        } else if (n>157 && n<203) {
          dir = "S&nbsp;"
        } else if (n>202 && n<248) {
          dir = "SV"
        } else if (n>247 && n<293) {
          dir = "V&nbsp;"
        } else {
          dir = "N&nbsp;"
        } 
        return "<div class='wind-dir' title='" + n + "' style='height:1em;display:inline-block;font-size:1.5em; line-height:0.9em; margin-right:0.3em;transform:rotate(" + n + "deg);-webkit-transform:rotate(" + n + "deg)'>&darr;</div><span>" + dir + "</span>";
    }    
    
    $scope.precipitation = function(item) {
        // Category of precipitation
        // 0 no
        // 1 snow
        // 2 snow and rain
        // 3 rain
        // 4 drizzle
        // 5 freezing rain
        // 6 freezing drizzle

        var cat = ""
        if (item.pcat === 1) {
            cat = "snö"
        }
        else if (item.pcat === 2) {
            cat = "snöblandat"
        }
        else if (item.pcat === 3) {
            cat = "regn"
        }
        else if (item.pcat === 4) {
            cat = "dugg"
        }
        else if (item.pcat === 5) {
            cat = "underkylt"
        }
        else if (item.pcat === 6) {
            cat = "underkylt"
        }
        else {
            cat = ""
        }

        if (item.pit > 0) {
            return item.pit + "/" + cat + ""
        }
        else {
            return "";
        }
    }
    
}).directive('windDirection', function() {
    return {
        
        link: function ($scope, element, attrs) {
            var n = attrs.wd;
            
            var dir = ""
            if (n>22 && n<68) {
              dir = "NO"
            } else if (n>67 && n<113) {
              dir = "O&nbsp;"
            } else if (n>112 && n<158) {
              dir = "SO"
            } else if (n>157 && n<203) {
              dir = "S&nbsp;"
            } else if (n>202 && n<248) {
              dir = "SV"
            } else if (n>247 && n<293) {
              dir = "V&nbsp;"
            } else if (n>293 && n<338) {
              dir = "NV"
            } else {
              dir = "N&nbsp;"
            } 
            element.html("<div class='wind-dir' title='" + n + "' style='height:1em;display:inline-block;font-size:1.5em; line-height:0.9em; margin-right:0.3em;transform:rotate(" + n + "deg);-webkit-transform:rotate(" + n + "deg)'>&darr;</div>&nbsp;<span class='badge' style='width:34px;'>" + dir + "</span>");
            
        }
    };
}).directive('precipitation', function() {
    return {

        template: function(element, attrs) {
            var htmlText = "";        
            console.log(attrs);
            var pcat = parseInt(attrs.pcat);
            console.log(attrs.pcat);
            var pit = attrs.pit;  
            // Category of precipitation
            // 0 no
            // 1 snow
            // 2 snow and rain
            // 3 rain
            // 4 drizzle
            // 5 freezing rain
            // 6 freezing drizzle
    
            var cat = "";
            if (pcat ===1) {
                cat = "snö";
            }
            else if (pcat === 2) {
                cat = "snöblandat";
            }
            else if (pcat === 3) {
                cat = "regn";
            }
            else if (pcat === 4) {
                cat = "dugg";
            }
            else if (pcat === 5) {
                cat = "underkylt";
            }
            else if (pcat === 6) {
                cat = "underkylt";
            }
            else {
                cat = "";
            }
    
            if (parseInt(pit) > 0) {
                //element.html();
                htmlText = "<code>" + pit + "/" + cat + "</code>";
            } else {
                
                htmlText = cat + "asd" + pit;
            }

            //var htmlText = '<div class="control-group">' + attrs.pcat + '</div>';
            return htmlText;
        }
    };
});


angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: function(elem, attr){
      return 'customer-'+attr.type+'.html';
    }
  };
});