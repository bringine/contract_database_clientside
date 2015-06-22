app.filter('filterNetCategory', function () {
    return function (items, search_term, netcategory) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];
            //console.log('search_term: ' + search_term);
            //console.log('category_id: ' + category.lookup_section_categoriesid);

            // if both search_term and category
            if((search_term.length > 3) &&
                (netcategory !== null && netcategory !== undefined)){
                for (var i=0; i < items.length; i++) {
                    var item = items[i];
                    //console.log(JSON.stringify(item, null, 4));
                    var c_name = item.netcategory.toLowerCase();
                    if(
                        (item.categoryId == netcategory.categoryId) &&
                        (c_name.indexOf(search_term.toLowerCase()) > -1)
                        )
                    {
                        filtered.push(item);
                    }
                }
            }else{
                // if just search_term
                if(search_term.length > 3){
                    for (var i=0; i < items.length; i++) {
                        var item = items[i];
                        var c_name = item.netcategory.toLowerCase();
                        if(c_name.indexOf(search_term.toLowerCase()) > -1){
                            filtered.push(item);
                        }
                    }
                }else{
                    // if just category
                    if(netcategory !== null && netcategory !== undefined){
                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                            var c_name = item.netcategory.toLowerCase();
                            if(item.categoryId == category.categoryId)
                            {
                                filtered.push(item);
                            }
                        }
                    }else{ // if nothing at all then show everything
                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                            filtered.push(item);
                        }
                    }
                }
            }

            return filtered;
        }
    };
});




app.controller("networkCtrl", function($scope, $http) {
    $scope.search_results = [];
    $scope.netcategories = [];
    $scope.results = [];
    $scope.showLoader = false;
    $scope.displayResultText = '';
    $scope.displayResultTitle = '';
    $scope.categoryRealFilter = '';

        // right column test array
    $scope.rightColArray =[];





    $scope.filterNetCategories = function (){
        console.log('going to filter contacts.');
        $scope.categoryRealFilter = $scope.netcategory_item.category;
        console.log($scope.netcategory_item.categoryId,
                    $scope.netcategory_item.category);
    }





    $scope.getContracts = function() {
       //var url = 'http://10.5.1.25:4000/api/contract_databases/getContracts';
       var url = 'http://10.5.1.201:4000/api/contract_databases/getContracts';
       $scope.showLoader = true;
       $http.post(url).
            success(function(data, status, headers, config) {
                $scope.search_results = data.data;
                $scope.showLoader = false;
                //console.log('got results back! %d', $scope.search_results.length);
            }).
            error(function(data, status, headers, config) {
                console.log('Error Occured.' + data);
                $scope.showLoader = false;
            });
    };




    $scope.getNetCategories  = function() {
       //var url = 'http://private-mryandunnco.c9.io/api/contract_database_objects/test';
       var url = 'http://10.5.1.201:4000/api/bulkcalcs/networkGrid';

       $scope.displayResult = "got something there";
        $http.post(url).
            success(function(data, status, headers, config) {
                $scope.netcategories = data.data;
           //     var blank_obj =
        //        {
        //          "categoryId": 0,
        //          "category": "- Not Selected - ",
        //          //"category_description": ""
        //        };
       //         $scope.netcategories.push(blank_obj);
                // points.sort(function(a, b){return a-b});


                $scope.netcategories =
                    $scope.netcategories.sort(function(a, b){

                    var nameA=a.category.toLowerCase();
                    var nameB=b.category.toLowerCase();
                     if (nameA < nameB) //sort string ascending
                     { return -1; }
                     if (nameA > nameB)
                     {  return 1; }
                     return 0; //default return value (no sorting)
                });
            }).
            error(function(data, status, headers, config) {
                console.log('Error Occured.' + data);

            });
    };




    $scope.getResult = function (t, i) {
      // var url = 'http://10.5.1.25:4000/api/contract_databases/getResults';
       var url = 'http://10.5.1.201:4000/api/contract_databases/getResults';
       $scope.showLoader = true;
       //post_vars =
       $http.post(url, {
           type: t,
           id: i
       }).
       success(function (data, status, headers, config) {
           $scope.results = data.data;

           // TH //  need to put this item into the right column display collector array...
           /////console.log('$scope.results[0].type', scope.results[0].type);
           console.log('$scope.results[0].id  ', $scope.results[0].id);
           console.log('$scope.results[0].display_id  ', $scope.results[0].display_id);

           //      $scope.rightColArray.splice(0, 0,$scope.results);
           //    //        $scope.rightColArray = $scope.rightColArray[0];


           $scope.rightColArray.splice(0, 0, $scope.results[0]);

           // below clearly not working, needs to have a unique value in the api returned array!  DO LATER... display_id possible?
           $scope.rightColArray == eliminateDuplicates($scope.rightColArray);

           $scope.displayResultText = $scope.results[0].description;
           $scope.displayResultTitle = $scope.results[0].type;;
           $scope.showLoader = false;

       }).
       error(function (data, status, headers, config) {
           console.log('Error Occured.' + data);
           $scope.showLoader = false;
       });
   };









 $scope.removeElement = function (index) {
     // works to remove the first one with that id, if id unique, then it'll work perfectly...
     console.log('index/key passed in: ', index);
        $scope.rightColArray.splice(index, 1 );
 };



 $scope.clearArray = function () {
     // works to clear entire rightColArray

             $scope.rightColArray.length=0;
 };





// need to adapt this one to look at a particular value in the array, and compare to
// other values - needs to come out of api with this unique value...
function eliminateDuplicates(arr) {
    var i;
    var len = arr.length;
    var out = [];
    var obj = {};

    for (i = 0; i < len; i++) {

        if (!obj[arr[i]])

        {

            obj[arr[i]] = {};

            out.push(arr[i]);

        }

    }
 //console.log(' out arr =  ', out );
    return out;
}






 $scope.moveElementUpx = function(key) {
     //
          console.log('key passed in: ', key);
             $scope.rightColArray.moveUp(key,1);
 };



 $scope.moveElementUp = function (indexFrom) {
     var indexTo;
     indexTo = indexFrom-1;
              console.log(' indexFrom ',  indexFrom);
              console.log(' indexTo: ',  indexTo);
    targetElement = $scope.rightColArray[indexFrom];
    magicIncrement = (indexTo - indexFrom) / Math.abs (indexTo - indexFrom);

    for (Element = indexFrom; Element != indexTo; Element += magicIncrement){
        $scope.rightColArray[Element] = $scope.rightColArray[Element + magicIncrement];
    }

    $scope.rightColArray[indexTo] = targetElement;

};


 $scope.moveElementDown = function (indexFrom) {
     var indexTo;
     indexTo = indexFrom+1;
              console.log(' indexFrom ',  indexFrom);
              console.log(' indexTo: ',  indexTo);
    targetElement = $scope.rightColArray[indexFrom];
    magicIncrement = (indexTo - indexFrom) / Math.abs (indexTo - indexFrom);

    for (Element = indexFrom; Element != indexTo; Element += magicIncrement){
        $scope.rightColArray[Element] = $scope.rightColArray[Element + magicIncrement];
    }

    $scope.rightColArray[indexTo] = targetElement;

};








    // superfluous for this project so far...
 $scope.removeElementByID = function (id) {
     // works to remove the first one with that id, if id unique, then it'll work perfectly...
     console.log('id passed in: ', id);

     for (var i = 0; i < $scope.rightColArray.length; i++)
         if ($scope.rightColArray[i].id && $scope.rightColArray[i].id === id) {
             $scope.rightColArray.splice(i, 1);
             break;
         }
 };




Array.prototype.moveUp = function(value, by) {
    var index = this.indexOf(value),
        newPos = index - (by || 1);

    if(index === -1)
        throw new Error('Element not found in array');

    if(newPos < 0)
        newPos = 0;

    this.splice(index,1);
    this.splice(newPos,0,value);
};

Array.prototype.moveDown = function(value, by) {
    var index = this.indexOf(value),
        newPos = index + (by || 1);

    if(index === -1)
        throw new Error('Element not found in array');

    if(newPos >= this.length)
        newPos = this.length;

    this.splice(index, 1);
    this.splice(newPos,0,value);
};


    $scope.numericComparator = function(expected, actual){

        //if(expected.length > 0)
        //{
            return angular.equals(actual, expected);
        //}
        //else{
        //    return true;
    //    }
    };

    var init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty
        $scope.getContracts();
        $scope.getNetCategories();
        $scope.search_term = '';
    };


    // run this function when the page loads.
    init();
});

