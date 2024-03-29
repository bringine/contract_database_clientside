app.filter('filterTermAndAgreement', function () {
    return function (items, search_term, category) {
        if(items == null)
        {
            console.log('items is null so do nothing');
        }else{
            var filtered = [];
         //   console.log('search_term: ' + search_term);
          //  console.log('category_id: ' + category.lookup_section_categoriesid);


            // if both search_term and category
            if((search_term.length > 2) &&
                (category !== null && category !== undefined)){
                for (var i=0; i < items.length; i++) {
                    var item = items[i];
    //    console.log("stringify - " + JSON.stringify(item, null, 4));
                    var c_name = item.NctcAgreementName.toLowerCase();
                                                console.log('c_name : ' + c_name );
                                                console.log('c_name.indexOf: ' + c_name.indexOf);
                    if(
                        (item.category_id == category.AgreementId) &&
                        (c_name.indexOf(search_term.toLowerCase()) > -1)
                        )
                    {
                        filtered.push(item);
                    }
                }
            }else{
                // if just search_term
    // console.log('search_term: ' + search_term);
                if(search_term.length > 2){
                    for (var i=0; i < items.length; i++) {
                        var item = items[i];
                        var c_name = item.NctcAgreementName.toLowerCase();
                        if(c_name.indexOf(search_term.toLowerCase()) > -1){
                            filtered.push(item);
                        }
                    }
                }else{
                    // if just category
                    if(category !== null && category !== undefined){
                        for (var i=0; i < items.length; i++) {
                            var item = items[i];
                            var c_name = item.NctcAgreementName.toLowerCase();
                            if(item.category_id == category.AgreementId)
                            {
                                filtered.push(item);
                            }
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



    $scope.filterAgreements = function (){
        console.log('going to filter glossary categories');
        $scope.agreementRealFilter = $scope.glossary_agreement_item.AgreementId;
        console.log($scope.glossary_agreement_item.NctcAgreementName,
                    $scope.glossary_agreement_item.AgreementId);
    }



    $scope.getGlossary = function() {
       //var url = 'http://private-mryandunnco.c9.io/api/contract_database_objects/test';
//       var url = 'http://10.5.1.25:3000/api/contractdbs/getContracts';
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryTermsGrid';
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




    $scope.getAgreements  = function() {
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryContractsWithTerms';
 //console.log('got glossaryContractswithTerms');

       $scope.displayResult = "got something there";
        $http.post(url).
            success(function(data, status, headers, config) {
                $scope.agreements = data.data;
               //console.log('second value in array = ' + $scope.agreements[1].NctcAgreementName);
                var blank_obj = {
                    "AgreementId": 0,
                    "NctcAgreementName": "- Not Selected - ", 
                };
                $scope.agreements.push(blank_obj);

            // points.sort(function(a, b){return a-b});
            $scope.agreements =
        $scope.agreements.sort(function (a, b) {
            return a[0]-b[0]
             });
                    }).
                    error(function(data, status, headers, config) {
                        console.log('Error Occurred.' + data);

                    });
            };






    $scope.getGlossaryResult = function (i) {
    //   var url = 'http://10.5.1.25:3000/api/contractdbs/getResults';
       var url = 'http://10.5.1.25:4000/api/bulkcalcs/glossaryDetailTerms';
//returns NctcAgreementName, GlossaryTerm, Definition, Location for a given AgreementGlossaryOfTermsId
           console.log('function i value = ' +i );
       $scope.showLoader = true;
       //post_vars =
       $http.post(url, {
           AgreementGlossaryOfTermsId: i
       }).
       success(function (data, status, headers, config) {
           $scope.results = data.data;


           $scope.rightColArray.splice(0, 0, $scope.results[0]);

           // below clearly not working, needs to have a unique value in the api returned array!
           $scope.rightColArray == eliminateDuplicates($scope.rightColArray);


           $scope.showLoader = false;


       }).
       error(function (data, status, headers, config) {
           console.log('Error Occured.' + data);
           $scope.showLoader = false;
       });
   };









 $scope.removeElement = function (id) {
     // works to remove the first one with that id, if id unique, then it'll work perfectly...
     console.log('id passed in: ', id);

     for (var i = 0; i < $scope.rightColArray.length; i++)
         if ($scope.rightColArray[i].id && $scope.rightColArray[i].id === id) {
             $scope.rightColArray.splice(i, 1);
             break;
         }
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
        $scope.search_term = '';

  //*      $scope.getNetworks();
    };


    // run this function when the page loads.
    init();
});

