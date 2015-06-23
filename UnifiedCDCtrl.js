// ** FILTERS SECTION - START ** //

    // ** CONTRACT TAB APP FILTERS - start ** //
    app.filter('filterTermAndCategory', function () {
    return function (items, search_term, category) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];
              if (category !== undefined) {
                  if (category.lookup_section_categoriesid==0) {
                      console.log('category resets to null now - ', category.lookup_section_categoriesid);
                       category === null;  // this is weak - how to completely empty this so that full data returns???
                  };
              };
            // need to set category to null if value is 'not selected'  or lookup_section_categoriesid=0
            console.log('search_term: ' + search_term);
            //console.log('category_id: ' + category.lookup_section_categoriesid);

            // if both search_term and category
            if((search_term.length > 1) &&
                (category !== null && category !== undefined)){
                for (var i=0; i < items.length; i++) {
                    var item = items[i];
                    //console.log(JSON.stringify(item, null, 4));
                    var c_name = item.contract_name.toLowerCase();
                 //   var c_name = item.contract_name.toLowerCase() + " " + item.network_name.toLowerCase();
                    // if we concatonate contract_name and network name... works if entire string is the search term including the space!
                    // Would need to make array and sort on each element in order to have two-column keyword search...
                    if(
                        (item.category_id == category.lookup_section_categoriesid) &&
                        (c_name.indexOf(search_term.toLowerCase()) > -1)
                        )
                    {
                        filtered.push(item);
                    }
                }
            }else{
                // if just search_term
                if(search_term.length > 1){
                    for (var i=0; i < items.length; i++) {
                        var item = items[i];
                        var c_name = item.contract_name.toLowerCase();
                        if(c_name.indexOf(search_term.toLowerCase()) > -1){
                            filtered.push(item);
                        }
                    }
                }else{
                    // if just category
                    if(category !== null && category !== undefined){
                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                            var c_name = item.contract_name.toLowerCase();
                            if(item.category_id == category.lookup_section_categoriesid)
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
    // ** CONTRACT TAB APP FILTERS - end ** //

    // ** NETWORK TAB APP FILTERS - start ** //
    app.filter('filterTermAndNetworkCategory', function () {
    return function (items, netsearch_term, netcategory, netsubcategory) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];
            // if both search_term and category
            if((netsearch_term.length > 1) &&
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
                if(netsearch_term.length > 1){
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
                            // console.log('filtered.length', filtered.length);
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
    // ** NETWORK  TAB APP FILTERS - end ** //

    // ** GLOSSARY TAB APP FILTERS - start ** //
    app.filter('filterGlossaryTermAndAgreement', function () {
    return function (items, gloss_search_term, agreement) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];
         //   console.log('search_term: ' + search_term);
          //  console.log('agreement_id: ' + agreement.lookup_section_categoriesid);
           //console.log('search_term.toLowerCase(): ' + search_term.toLowerCase());
           //console.log('agreement: ' + agreement);

            // if both search_term and category
            if((gloss_search_term.length > 1) &&
                (agreement !== null && agreement !== undefined)){
                for (var i=0; i < items.length; i++) {
                    var item = items[i];
                  //    console.log("stringify - " + JSON.stringify(item, null, 4));
                  if (item.GlossaryTerm !== null) { // th4

                      var c_name = item.GlossaryTerm.toLowerCase();
                      console.log('c_name : ' + c_name);
                      console.log('c_name.indexOf: ' + c_name.indexOf);
                      if (
                          (item.AgreementId == agreement.AgreementId) &&
                          (c_name.indexOf(gloss_search_term.toLowerCase()) > -1)
                      ) {
                          filtered.push(item);
                      }

                  } // th4
                }
            }else{
                // if just search_term
                if(gloss_search_term.length > 1){
                    for (var i=0; i < items.length; i++) {
                        var item = items[i];

                        if(item.GlossaryTerm !== null){    // th4

                                var c_name = item.GlossaryTerm.toLowerCase();       // there doesn't appear to be anything here...
                   console.log('item.GlossaryTerm.toLowerCase(): ' + item.GlossaryTerm.toLowerCase());
                 //  console.log('c_name.indexOf(gloss_search_term.toLowerCase()): ' + c_name.indexOf(gloss_search_term.toLowerCase()));
                                if(c_name.indexOf(gloss_search_term.toLowerCase()) > -1){
                                    filtered.push(item);

                            }  // th4

                        }
                    }
                }else{
                    // if just category
                    if(agreement !== null && agreement !== undefined){
                        for (var i=0; i < items.length; i++) {

                            var item = items[i];

                               if(item.GlossaryTerm !== null){    // th4

                            var c_name = item.GlossaryTerm.toLowerCase();
                            if(item.AgreementId == agreement.AgreementId)
                            {
                                filtered.push(item);
                            }

                             }  // th4


                        }
                    }else{ // if nothing at all then show everything

                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                              //  console.log('nothing: ' + item);
                            filtered.push(item);
                        }
                    }
                }
            }
            return filtered;
        }
    };
});
    // ** GLOSSARY TAB APP FILTERS - end ** //

// ** FILTERS SECTION - END ** //


// **  APP DIRECTIVES SECTION START - TABBING
       app.directive('tab', function() {
          return {
            restrict: 'E',
            transclude: true,
            template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
            require: '^tabset',
            scope: {
                heading: '@'
                },
            link: function(scope, elem, attr, tabsetCtrl) {
                  scope.active = false
                  tabsetCtrl.addTab(scope)
                }
          }
        })

       app.directive('tabset', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: { },
        templateUrl: 'templates/tabstyle.html',
        bindToController: true,
        controllerAs: 'tabset',
        controller: function() {
          var self = this
          self.tabs = []
          self.addTab = function addTab(tab) {
          self.tabs.push(tab)
              if(self.tabs.length === 1) {
                tab.active = true
              }
            }
          self.select = function(selectedTab) {
              angular.forEach(self.tabs, function(tab) {
                if(tab.active && tab !== selectedTab) {
                  tab.active = false;
                }
              })

              selectedTab.active = true;
            }
        }
      }
    })
// **  APP DIRECTIVES SECTION END



// ** CONTROLLER SECTION - START ** //
//app.controller("contractCtrl", function($scope, $http) {
app.controller("contractdbCtrl", function($scope, $http) {

    $scope.search_results = [];
    $scope.categories = [];
    $scope.results = [];
    $scope.showLoader = false;
    $scope.displayResultText = '';
    $scope.displayResultTitle = '';
    $scope.categoryRealFilter = '';

    $scope.subcategories = [];
    $scope.subcategoryRealFilter = '';
    $scope.agreementRealFilter = '';

    $scope.netcategories = [];
    $scope.netsubcategories = [];
    $scope.netcategoryRealFilter = '';
    $scope.netsubcategoryRealFilter = '';
    $scope.netresults = [];
    $scope.netsearch_results = [];

    $scope.gloss_search_results = [];
    $scope.glossresults = [];

    $scope.rightColArray =[];


 // * CONTROLLER SECTION - SCOPE FILTERS - start * //
    // ** scope filter for Contracts - start ** //
        $scope.filterCategories = function (){
            console.log('going to filter contacts.');
            $scope.categoryRealFilter = $scope.category_item.lookup_section_categoriesid;
            console.log($scope.category_item.category_name,
                        $scope.category_item.lookup_section_categoriesid);
        }
    // ** scope filter for Contracts - end ** //

    // ** scope filter for Network - start ** //
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
    // ** scope filter for Network - end ** //

    // ** scope filter for Glossary - start ** //
        $scope.filterAgreements = function (){
        console.log('going to filter glossary categories');
        $scope.agreementRealFilter = $scope.glossary_agreement_item.AgreementId;
        console.log($scope.glossary_agreement_item.NctcAgreementName,
                    $scope.glossary_agreement_item.AgreementId);
    }
    // ** scope filter for Glossary - end ** //

 // * CONTROLLER SECTION - FILTERS - end * //



 // * CONTROLLER SECTION - DATA - start * //

    // ** CONTRACT TAB DATA - start ** //


        $scope.getContracts = function() {
          var url = 'http://10.5.1.25:4000/api/contract_databases/getContracts';
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

        $scope.getCategories  = function() {
          var url = 'http://10.5.1.25:4000/api/contract_databases/getCategories';
           $scope.displayResult = "got something there";
            $http.post(url).
                success(function(data, status, headers, config) {
                    $scope.categories = data.data;
                    var blank_obj =
                    {
                      "lookup_section_categoriesid": 0,
                      "category_name": "- Not Selected - ",
                      "category_description": ""
                    };
                    $scope.categories.push(blank_obj);
                    // points.sort(function(a, b){return a-b});
                    $scope.categories =
                        $scope.categories.sort(function(a, b){
                        var nameA=a.category_name.toLowerCase();
                        var nameB=b.category_name.toLowerCase();
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

        $scope.getCategories  = function() {
           var url = 'http://10.5.1.25:4000/api/contract_databases/getCategories';

           $scope.displayResult = "got something there";
            $http.post(url).
                success(function(data, status, headers, config) {
                    $scope.categories = data.data;
                    var blank_obj =
                    {
                      "lookup_section_categoriesid": 0,
                      "category_name": "- Not Selected - ",
                      "category_description": ""
                    };
                    $scope.categories.push(blank_obj);
                    // points.sort(function(a, b){return a-b});
                    $scope.categories =
                        $scope.categories.sort(function(a, b){

                        var nameA=a.category_name.toLowerCase();
                        var nameB=b.category_name.toLowerCase();
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
           var url = 'http://10.5.1.25:4000/api/contract_databases/getResults';
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

    // ** CONTRACT TAB DATA - end ** //


    // ** NETWORK TAB DATA - start ** //
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

    // ** NETWORK TAB DATA - end ** //


    // ** GLOSSARY TAB DATA - start ** //

        $scope.getGlossary = function() {
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryTermsGrid';
       $scope.showLoader = true;
       $http.post(url).
            success(function(data, status, headers, config) {
                $scope.gloss_search_results = data.data;
                $scope.showLoader = false;
                //console.log('got results back! %d', $scope.gloss_search_results.length);
            }).
            error(function(data, status, headers, config) {
                console.log('Error Occured.' + data);
                $scope.showLoader = false;
            });
    };

        $scope.getAgreements  = function() {
            var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryContractsWithTerms';
           $scope.displayResult = "got something there";
            $http.post(url).
                success(function(data, status, headers, config) {
                            $scope.agreements = data.data;
                    // console.log('$scope.agreements = ' + $scope.agreements);
                             var blank_obj =
                                {
                                   "AgreementId": 0,
                                   "NctcAgreementName": "- Not Selected - ",
                                };
                           $scope.agreements.push(blank_obj);
                            $scope.agreements =
                                $scope.agreements.sort(function(c, d){
                                var nameC=c.NctcAgreementName.toLowerCase();
                                var nameD=d.NctcAgreementName.toLowerCase();
                                 if (nameC < nameD) //sort string ascending
                                 { return -1; }
                                 if (nameC > nameD)
                                 {  return 1; }
                                 return 0; //default return value (no sorting)
                            });
                        }).
                        error(function(data, status, headers, config) {
                            console.log('Error Occurred.' + data);
                        });
                };

        $scope.getGlossaryResult = function (i) {
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryDetailTerms';
        //returns NctcAgreementName, GlossaryTerm, Definition, Location for a given AgreementGlossaryOfTermsId
           console.log('function i value = ' +i );
       $scope.showLoader = true;
       //post_vars =
       $http.post(url, {
           AgreementGlossaryOfTermsId: i
       }).
       success(function (data, status, headers, config) {
           $scope.glossresults = data.data;
                                    var strGtype="";
                                    strGtype += "<p><b>" + $scope.glossresults[0].GlossaryTerm + "<\/b> - Glossary Term<br \/> ";
                                    strGtype += "Contract: " + $scope.glossresults[0].NctcAgreementName + " <\/p> ";
                                    var strGdesc="";
                                    strGdesc += "<p><b>" + $scope.glossresults[0].GlossaryTerm + "<\/b><br \/> ";
                                    strGdesc += "" + $scope.glossresults[0].Definition + "<\/p> ";
                                    strGdesc += "<p><b>Location:<\/b>" + $scope.glossresults[0].Location + "<\/p>";
                                    $scope.tempGresults = [];
                                    $scope.tempGresults = {type:strGtype, description:strGdesc};

           $scope.rightColArray.splice(0, 0, $scope.tempGresults);
           // below clearly not working, needs to have a unique value in the api returned array!
           $scope.rightColArray == eliminateDuplicates($scope.rightColArray);
           $scope.showLoader = false;
       }).
       error(function (data, status, headers, config) {
           console.log('Error Occured.' + data);
           $scope.showLoader = false;
       });
   };


    // ** GLOSSARY TAB DATA - end ** //


 // * CONTROLLER SECTION - DATA - end * //




// *  RIGHT COLUMN CONTROLS - START * //

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

// *  RIGHT COLUMN CONTROLS - END * //



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
        $scope.getCategories();
        $scope.search_term = '';

        $scope.getnetContracts();
        $scope.getnetCategories();
        $scope.getnetSubCategories();
        $scope.netsearch_term = '';

        $scope.getAgreements();
        $scope.getGlossary();
        $scope.gloss_search_term = '';

    };


    // run this function when the page loads.
    init();
});

