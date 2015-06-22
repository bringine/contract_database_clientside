app.filter('filterTermAndNetworkCategory', function () {
    return function (items, netsearch_term, netcategory, netsubcategory) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];

        //    console.log('netsubcategory',netsubcategory);


            // ok, if netsubcategory exists, it will have categoryId and subcategoryID, so we can use only that object, not netcategory....


       //     if(netsubcategory !== null && netsubcategory !== undefined){
       //                 netcategory=netsubcategory;
       //             }





            // if both search_term and category
            if((netsearch_term.length > 3) &&
                (netcategory !== null && netcategory !== undefined)){
                for (var i=0; i < items.length; i++) {
                    var item = items[i];
                    //console.log(JSON.stringify(item, null, 4));
                    var c_name = item.network.toLowerCase();
           // console.log('c_name.indexOf(netsearch_term.toLowerCase())',c_name.indexOf(netsearch_term.toLowerCase()));
                    if(
                        (item.categoryId == netcategory.categoryId) &&
                        (c_name.indexOf(netsearch_term.toLowerCase()) > -1)
                        )
                    {
                        filtered.push(item);
                    }
                }
            }else{
                // if just search_term
                if(netsearch_term.length > 3){
                    for (var i=0; i < items.length; i++) {
                        var item = items[i];
                        var c_name = item.network.toLowerCase();
                        if(c_name.indexOf(netsearch_term.toLowerCase()) > -1){
                            filtered.push(item);
                        }
                    }
                }else{


                    // if just category
                    if(netcategory !== null && netcategory !== undefined){
                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                            var c_name = item.category.toLowerCase();
                            if(item.categoryId == netcategory.categoryId)
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

    // check to see if subcategory exists - then filter current 'filtered' to show only those that match...
                      if(netsubcategory !== null && netsubcategory !== undefined){

 console.log('filtered.length', filtered.length);

                        subfiltered =[];
                          for (var i=0; i < filtered.length; i++) {
                             var subitem = filtered[i];

                           //   console.log('subitem.subcategory', subitem.subcategory);
                           //   console.log('netsubcategory.netsubcategory', netsubcategory.subcategory);

                             if(subitem.subcategory == netsubcategory.subcategory)
                                {
                                    subfiltered.push(subitem);
                                     console.log('subitem.subcategory[0]', subitem.subcategory);
                                }
                           }
                            return subfiltered;
                        }else{
                         return filtered;
                        }




        }
    };
});


//*****************************************************************************************************************//



//*****************************************************************************************************************//

app.controller("contractdbCtrl", function($scope, $http) {

    $scope.showLoader = false;
    $scope.displayResultText = '';
    $scope.displayResultTitle = '';
    $scope.categoryRealFilter = '';
    $scope.subcategoryRealFilter = '';

    $scope.netcategories = [];
    $scope.netsubcategories = [];
    $scope.netcategoryRealFilter = '';
    $scope.netsubcategoryRealFilter = '';
    $scope.netresults = [];
    $scope.netsearch_results = [];

        // right column test array
    $scope.rightColArray =[];



    $scope.filternetCategories = function (){
        console.log('going to filter contacts.');
        $scope.netcategoryRealFilter = $scope.netcategory_item.category;  //$scope.category_item.categoryId;   //TH 6/15/2015
         console.log('filterCategories: netcategory | netcategoryId = ', $scope.netcategory_item.category + ' | ' + $scope.netcategory_item.categoryId);
        $scope.getnetSubCategories($scope.netcategory_item.categoryId);
    };


    $scope.filternetSubCategories = function (ci){
        console.log('going to filter subcategories.', ci);
        $scope.netsubcategoryRealFilter = $scope.netsubcategory_item.subcategory;  //$scope.category_item.categoryId;   //TH 6/15/2015
         console.log('filterSubCategories: netsubcategory | netsubcategoryId = ',$scope.netsubcategory_item.subcategory + ' | ' + $scope.netsubcategory_item.subcategoryId);
         console.log('filterCategories: netcategory | netcategoryId = ', $scope.netcategory_item.category + ' | ' + $scope.netcategory_item.categoryId);
    };


    $scope.getnetCategories  = function() {
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkCategory';

       $scope.displayResult = "got something there";
        $http.post(url).
            success(function(data, status, headers, config) {
                $scope.netcategories = data.data;
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


    $scope.getnetSubCategories  = function(ci) {
      // var url = 'http://10.5.1.25:4000/api/contract_databases/getContracts';
         var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkSubCategory';

       $scope.displayResult = "got something there";
        $http.post(url).
            success(function(data, status, headers, config) {
                $scope.netsubcategories = data.data;

                $scope.netsubcategories =
                    $scope.netsubcategories.sort(function(g, h){

                    var nameG=g.subcategory.toLowerCase();
                    var nameH=h.subcategory.toLowerCase();
                     if (nameG < nameH) //sort string ascending
                     { return -1; }
                     if (nameG > nameH)
                     {  return 1; }
                     return 0; //default return value (no sorting)
                });

                  if(ci !== null && ci !== undefined){
                       filteredsubs = [];
                        for (var i=0; i < $scope.netsubcategories.length; i++) {
                          if($scope.netsubcategories[i].categoryId == ci){
                           //console.log('$scope.netsubcategories[i].categoryId = ', $scope.netsubcategories[i].categoryId);
                            filteredsubs.push($scope.netsubcategories[i]);
                           }
                         }
                       $scope.netsubcategories = filteredsubs;
                    };
            }).
            error(function(data, status, headers, config) {
                console.log('Error Occured.' + data);
            });
    };




    $scope.getnetContracts = function() {
       //var url = 'http://10.5.1.25:4000/api/contract_databases/getContracts';
        //var url = 'http://10.5.1.201:4000/api/bulkcalcs/networkGrid';
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkGrid';
       $scope.showLoader = true;
       $http.post(url).
            success(function(data, status, headers, config) {
                $scope.netsearch_results = data.data;
                $scope.showLoader = false;
                //console.log('got results back! %d', $scope.netsearch_results.length);
            }).
            error(function(data, status, headers, config) {
                console.log('Error Occured.' + data);
                $scope.showLoader = false;
            });
    };





    $scope.getNetworkResult = function (t,i,cL,ctL,sctL) {
      //  console.log('t,i,cL,ctL,sctL ', t,i,cL,ctL,sctL);
                                    var strtype="";
                                    strtype += "" + cL + " Contract<br \/>";
                                    strtype += "Category: " + ctL + " <br \/>";
                                    strtype += "Sub Category: " + sctL + " ";
        /* following is a switch to reformat different data being returned for different category selections */
        switch (t) {
            case 1:  //categoryId= 1 (carriage)
                //use subcategoryId for Programs_ParticipationRulesId on http://10.5.1.25:4000/api/bulkcalcs/networkDetailCarriage
                          var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkDetailCarriage';
                           $scope.showLoader = true;
                           //post_vars =
                           $http.post(url, {
                               Programs_ParticipationRulesId: i
                           }).
                           success(function (data, status, headers, config) {
                               $scope.netresults = data.data;
                                    //Programs_ParticipationRulesId
                                    //ProgrammerRuleType
                                    //NCTCProgrammerCode
                                    //ObligationDescription
                                    //ContractLocation
                                    //SystemTrigger
                                /*  here is where we reformat Carriage returned info for display in rightCol display*/
                                    var strdesc="";
                                    strdesc += "<p><b>Programmer Rule Type: <\/b>  " + $scope.netresults[0].ProgrammerRuleType + " <\/p> ";
                                    strdesc += "<p><b>Programmer Code:<\/b> " + $scope.netresults[0].NCTCProgrammerCode + " <\/p> ";
                                    strdesc += "<p><b>Description:<\/b><br \/>" + $scope.netresults[0].ObligationDescription + "<\/p> ";
                                    strdesc += "<p><b>Contract Location:<\/b><br \/>" + $scope.netresults[0].ContractLocation + "<\/p> ";
                                    strdesc += "<p><b>System Trigger:<\/b><br \/>" + $scope.netresults[0].SystemTrigger + "<\/p>";
                             //        console.log('strdesc ', strdesc);
                                    $scope.tempresults = [];
                                    $scope.tempresults = {type:strtype, description:strdesc};
                              //      console.log('$scope.tempresults[0] ', $scope.tempresults[0]);
                               $scope.rightColArray.splice(0, 0, $scope.tempresults);   //$scope.rightColArray.splice(0, 0, $scope.results[0]);
                                                            //    $scope.displayResultTitle = $scope.results[0].type;;  // <b>
                                                            //    $scope.displayResultText = $scope.results[0].description;  // <p>
                               $scope.showLoader = false;

                           }).
                           error(function (data, status, headers, config) {
                               console.log('Error Occured.' + data);
                               $scope.showLoader = false;
                           });
                    break;
            case 2:   //categoryId= 2 (rate calculation)
                //use subcategoryId for ProgrammerRateCalculationId on http://10.5.1.25:4000/api/bulkcalcs/networkDetailRateCalculation

                          var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkDetailRateCalculation';
                           $scope.showLoader = true;
                           //post_vars =
                           $http.post(url, {
                               ProgrammerRateCalculationId: i
                           }).
                           success(function (data, status, headers, config) {
                               $scope.netresults = data.data;

                               // TH //  need to put this item into the right column display collector array...
                               /////console.log('$scope.results[0].type', scope.results[0].type);
                              // console.log('$scope.results[0]   ', $scope.results[0] );
                                    // ProgrammerRateCalculationId
                                    // NCTCProgrammerCode
                                    // RateType
                                    // CalculationTypeDescription
                                /*  here is where we reformat Carriage returned info for display in rightCol display*/
                                    var strdesc="";
                                    //strdesc += "<p><b>Programmer Rate Calculation Id: <\/b>  " + $scope.results[0].ProgrammerRateCalculationId + " <\/p> ";
                                    strdesc += "<p><b>Programmer Code:<\/b> " + $scope.netresults[0].NCTCProgrammerCode + " <\/p> ";
                                    strdesc += "<p><b>Rate Type:<\/b><br \/>" + $scope.netresults[0].RateType + "<\/p> ";
                                    strdesc += "<p><b>Calculation Type Description:<\/b><br \/>" + $scope.netresults[0].CalculationTypeDescription + "<\/p>";
                               //      console.log('strdesc ', strdesc);
                                    $scope.tempresults = [];
                                    $scope.tempresults = {type:strtype, description:strdesc};
                                //    console.log('$scope.tempresults[0] ', $scope.tempresults[0]);
                               $scope.rightColArray.splice(0, 0, $scope.tempresults);   //$scope.rightColArray.splice(0, 0, $scope.results[0]);
                               $scope.showLoader = false;

                           }).
                           error(function (data, status, headers, config) {
                               console.log('Error Occured.' + data);
                               $scope.showLoader = false;
                           });

                    break;
            case 3:   //categoryId= 3 (programmer incentives)
                //use subcategoryId for ProgrammerIncentivesId on http://10.5.1.25:4000/api/bulkcalcs/networkDetailProgrammerIncentive

                          var url = 'http://10.5.1.25:4000/api/bulkcalcs/networkDetailProgrammerIncentive';
                           $scope.showLoader = true;
                           //post_vars =
                           $http.post(url, {
                               ProgrammerIncentivesId: i
                           }).
                           success(function (data, status, headers, config) {
                               $scope.netresults = data.data;
                              // console.log('$scope.results[0]   ', $scope.results[0] );
                              // console.log('$scope.results[0].IncentiveType   ', $scope.results[0].IncentiveType );
                                    // ProgrammerIncentivesId
                                    // IncentiveType
                                    // IncentiveDetails
                                /*  here is where we reformat Carriage returned info for display in rightCol display*/
                                    var strdesc="";
                                    //strdesc += "<p><b>ProgrammerIncentivesId: <\/b>  " + $scope.results[0].ProgrammerIncentivesId + " <\/p> ";
                                    strdesc += "<p><b>Incentive Type:<\/b> " + $scope.netresults[0].IncentiveType + " <\/p> ";
                                    strdesc += "<p><b>Incentive Details:<\/b><br \/>" + $scope.netresults[0].IncentiveDetails + "<\/p>";
                                 //    console.log('strdesc ', strdesc);
                                    $scope.tempresults = [];
                                    $scope.tempresults = {type:strtype, description:strdesc};
                                 //   console.log('$scope.tempresults[0] ', $scope.tempresults[0]);
                               $scope.rightColArray.splice(0, 0, $scope.tempresults);   //$scope.rightColArray.splice(0, 0, $scope.results[0]);
                               $scope.showLoader = false;

                           }).
                           error(function (data, status, headers, config) {
                               console.log('Error Occured.' + data);
                               $scope.showLoader = false;
                           });

                    break;
            default:
                // do nothing
                    break;
        };
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
};



$scope.moveElementUp = function (indexFrom) {
     var indexTo;
     indexTo = indexFrom-1;
     if(indexFrom!==0) {    // won't allow to add empty element by pushing up button on first element
                  console.log(' indexFrom ',  indexFrom);
                  console.log(' indexTo: ',  indexTo);
        targetElement = $scope.rightColArray[indexFrom];
        magicIncrement = (indexTo - indexFrom) / Math.abs (indexTo - indexFrom);

        for (Element = indexFrom; Element != indexTo; Element += magicIncrement){
            $scope.rightColArray[Element] = $scope.rightColArray[Element + magicIncrement];
        }

        $scope.rightColArray[indexTo] = targetElement;

     };
};


 $scope.moveElementDown = function (indexFrom) {
     var indexTo;
     indexTo = indexFrom+1;
     if(indexTo!==$scope.rightColArray.length) {    // won't allow to add empty element by pushing down button on last element

                  console.log(' indexFrom ',  indexFrom);
                  console.log(' indexTo: ',  indexTo);
                  console.log(' $scope.rightColArray.length = ', $scope.rightColArray.length );
        targetElement = $scope.rightColArray[indexFrom];
        magicIncrement = (indexTo - indexFrom) / Math.abs (indexTo - indexFrom);

        for (Element = indexFrom; Element != indexTo; Element += magicIncrement){
            $scope.rightColArray[Element] = $scope.rightColArray[Element + magicIncrement];
        }

        $scope.rightColArray[indexTo] = targetElement;

     };

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
         $scope.getnetContracts();
        $scope.getnetCategories();
        $scope.getnetSubCategories();
        $scope.netsearch_term = '';
    };


    // run this function when the page loads.
    init();
});

