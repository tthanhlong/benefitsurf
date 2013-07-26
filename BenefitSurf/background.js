/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/scopes_background
*************************************************************************************/
//extension code here
appAPI.ready(function($) {
	
	appAPI.browserAction.setResourceIcon('new.png');
	appAPI.browserAction.setTitle('Open my account');
	appAPI.db.set('checkIframe', true);
	
	/*Call web service to get all stores*/
//   	var stores = appAPI.db.get("Advertiser");
	
//   	if(stores !== null){
//		appAPI.db.remove("Advertiser");
//   	}
//   	alert('before request');
   	appAPI.request.post({
//        url: 'http://192.168.29.120/Strut2_000/showStudents',
		url: 'http://46.137.247.47:8080/HoGoTest/api/v1/Login',
        postData: 'EmailAddress=admin&Password=e10adc3949ba59abbe56e057f20f883e',
        onSuccess: function(response) {
//        	alert('request success');
        	appAPI.db.remove("Advertiser");
            appAPI.db.set("Advertiser", response);
//            alert(response);
//            appAPI.message.toActiveTab({action:'advertiserData'});
    	},
        onFailure: function(httpCode) {
        	alert('request failure');
//            alert('Failed to retrieve content. (HTTP Code:' + httpCode + ')');
        },
        additionalRequestHeaders: {
            myHeader: 'value'
        },
        contentType: 'application/x-www-form-urlencoded'
    });
//    alert('after request');
//    if(appAPI.db.get("Advertiser") === null){
//    	alert('null roi  nha');
//    }
//    var advertiserJSON = JSON.parse(appAPI.db.get("Advertiser"));
	var advertiserJSON = JSON.parse("{\"respCode\": \"OK\", \"emailAddress\": \"tthanhlong@tma.com.vn\", \"advertisers\": [{\"advertiserId\": \"adv001\", \"domainName\": \"amazon.com\", \"discount\": 0.04}, {\"advertiserId\": \"adv002\", \"domainName\": \"vnexpress.net\", \"discount\": 0.02}, {\"advertiserId\": \"adv003\", \"domainName\": \"24h.com.vn\", \"discount\": 0.035},{\"advertiserId\": \"adv004\", \"domainName\": \"baomoi.com\", \"discount\": 0.025}, {\"advertiserId\": \"adv005\", \"domainName\": \"bongdaso.com\", \"discount\": 0.03}, {\"advertiserId\": \"adv006\", \"domainName\": \"socbay.com\", \"discount\": 0.045}]}");
    appAPI.db.set('selectedEmail', advertiserJSON.emailAddress);
    
    appAPI.webRequest.onBeforeNavigate.addListener(function(details, opaque) {
    	var count = 0;
	    // Where:
	    //   * details.pageUrl is the URL of the tab requesting the page
	    //   * opaqueData is the data passed to the context of the callback function
	    // Redirect requests for amazon.com
//	    $.each(advertiserJSON.advertisers, function(key, value){
	    for(var i = 0; i < opaque.numOfAd; i++){
	    	var value = opaque.lstAdvertisers.advertisers[i];
	    	var selectedStore = value.domainName;
	    	if (details.pageUrl.indexOf(selectedStore) !== -1) {
				count = 1;
				appAPI.db.set('discount', value.discount);
		    }
    	}
//	    });
	    
	    if(count !== 0){
	    	count = 0;
			// Save request for popup to local database
		    appAPI.db.set('showPopup', true);
	//		      	appAPI.db.set('email', advertiserJSON.emailAddress);
	//		      	appAPI.db.set('discount', value.discount);
		  	return {redirectTo: 'http://google.com.vn/'};
		}
	}, {lstAdvertisers: advertiserJSON, numOfAd: advertiserJSON.advertisers.length});
	
	appAPI.browserAction.onClick(function() {
	    if(appAPI.db.get('checkIframe') !== null){
	    	appAPI.message.toActiveTab({action:'openIframe'});
	    	appAPI.db.remove("checkIframe");
//	    	appAPI.browserAction.setTitle('Close my account');
	    }
//	    else{
//	    	appAPI.message.toActiveTab({action:'closeIframe'});
//	    	appAPI.db.set('checkIframe', true);
//	    	appAPI.browserAction.setTitle('Open my account');
//	    }
    });
});
