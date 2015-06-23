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
                    //  console.log('c_name : ' + c_name);
                    //  console.log('c_name.indexOf: ' + c_name.indexOf);
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


app.controller("glossaryCtrl", function($scope, $http) {
    $scope.search_results = [];
//$scope.agreements = [];
    $scope.results = [];
    $scope.showLoader = false;
    $scope.displayResultText = '';
    $scope.displayResultTitle = '';
    $scope.agreementRealFilter = '';
        // right column test array
    $scope.rightColArray =[];


    $scope.gloss_search_results = [];
    $scope.glossresults = [];


    $scope.filterAgreements = function (){
        console.log('going to filter glossary categories');
        $scope.agreementRealFilter = $scope.glossary_agreement_item.AgreementId;
        console.log($scope.glossary_agreement_item.NctcAgreementName,
                    $scope.glossary_agreement_item.AgreementId);
    }



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
  //*      $scope.getContracts();
  //*     $scope.getCategories();
        $scope.getAgreements();
        $scope.getGlossary();
        $scope.gloss_search_term = '';

  //*      $scope.getNetworks();
    };


    // run this function when the page loads.
    init();
});

