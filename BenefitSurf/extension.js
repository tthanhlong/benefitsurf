/************************************************************************************
  This is your Page Code. The appAPI.ready() code block will be executed on every page load.
  For more information please visit our docs site: http://docs.crossrider.com
*************************************************************************************/
//extension code here
appAPI.ready(function($) {
	
	appAPI.resources.includeJS("common.js");
	
	var thankYouDomain = '*.zebraplace.com/plugin/*';
   	
	var currentPage = document.location.href;
	var appUserId = appAPI.appInfo.userId;
	
	var userIDExisted = appAPI.db.get("userID");
	/*---------Get parameter from thank you page and send to server to save userID and partnerID---------*/
	if(userIDExisted === null){
		if (appAPI.isMatchPages(thankYouDomain)){
			var userID = queryString()["userId"];
			var partnerID = queryString()["partnerId"];
			
			appAPI.db.set("userID", userID);
			appAPI.db.set("partnerID", "partnerID");
			
			
			/*Call web service to save plugin when loading thank you page*/
//			appAPI.request.post({
//		        url: '',
//		        // Data to post
//		        postData: {url:currentPage, dateAccess:dateLong},
//		        onSuccess: function(response) {
//					//handle success
//		        },
//		        onFailure: function(httpCode) {
//					//handle failure
//		        },
//		        additionalRequestHeaders: {
//		            myHeader: 'value'
//		        },
//		        contentType: 'application/json'
//		    });
		}
	}else{
		//User is existed
	}
	/*--------------End get parameter from thank you page and send to server to save userID and partnerID---------*/
	
	
	/*--------------Check if the web page user visit is existed or not. Show pop-up discount--------------*/
//	alert('check visit page');
		
//	appAPI.message.addListener(function(msg) {
//	    if (msg.action === 'advertiserData') {
////	    	alert('inside message action');
//	    	var lstAdvertisers = appAPI.db.get("Advertiser");
////			alert(lstAdvertisers);
//			advertiserJSON = JSON.parse(lstAdvertisers);
////			alert(advertiserJSON.status);
//
////			appAPI.message.toPopup({action:'sendEmailToPopUp', 'email': advertiserJSON.emailAddress});
//			
//	    }
//	    alert('inside adddListener');
//	});
	
	
//	var lstAdvertisers = appAPI.db.get("Advertiser");
//	var advertiserJSON = JSON.parse(lstAdvertisers);
//	
//	$.each(advertiserJSON.advertisers, function(key, value){
//		var selectedAdvertiser = value.domainName;
//		if(appAPI.isMatchPages(selectedAdvertiser)){
////			appAPI.openURL({
////	            url: "https://www.google.com",
////	            where: "current"
////	        });
////			document.location.href = 'https://www.google.com';
//			
//	        appAPI.message.toActiveTab({action:'showPopup'});
//	        
//	        
////	        appAPI.notifier.show({
////			 'name':'my-notification-name', // Pick a distinctive name. it will not be displayed for the users but used by the system for identification.
////			 'title':'Notification Title', // Notification title [optional]
////			 'body':'<span style="font-weight:bold;color:red;">Hello :)</span>', // Notification body - supports HTML.
////			 'link':'http://mysite.com/welcome', // Notification target link. Will be opened when user clicks the notification
////			 'theme':'default' ,// Notification theme: "default", "facebook", "grey", "cyan", "orange", "lime", "navy", "dark-grey", "light-grey", "light-cyan", "peach", "light-green", "white-black", "white-blue", "white-darkred", "white-lime"
////			 'position':'top-right', // Notification position: "top-right", "top-left", "bottom-left", "bottom-right"
////			 'icon':'http://mysite.com/img.png', // Notification icon url [optional]
////			 'close':true, // Show close [X] icon
////			 'sticky':false, // If you set this to true the notification will not fade until the user clicks or closes it
////			 'fadeAfter':5, // Fade after X seconds (default 5 seconds) - valid only if sticky:false
////			 'width':'400px', // Notification width (default 275)
////			 'closeWhenClicked':true // Notification closes right after user click (default true)
////			});
//		}
//	});
	
	
	// Check if popup required
  if (appAPI.db.get('showPopup') !== null) {
    // Reset popup
    appAPI.db.remove('showPopup');
    var selectedEmail = appAPI.db.get('selectedEmail');
    var discount = appAPI.db.get('discount');
    
    appAPI.notifier.show({
      'name':'my-notification-name',
      'title':'Notification Title',
      'body':'Hello :)' + selectedEmail + '. Here you will get ' + discount + 'discount',
      'link':'http://google.com',
      'theme':'white-blue',
      'position':'top-right',
      'close':true,
      'sticky':false,
      'fadeAfter':5,
      'width':'400px',
      'closeWhenClicked':true
    });
  }
	
	/*--------------End check if the web page user visit is existed or not--------------*/
		
	// Binding an event using jQuery
    // You can only bind an event from within an extension using jQuery
    $('body').bindExtensionEvent('myExtensionEvent',
        // where data is defined as follows:
        // {key:'userId'}
        function(e, data) {
            if(data.key == "value"){
            	appAPI.message.toActiveTab({action: 'closeIframe'});
            appAPI.db.set('checkIframe', true);
            }
        }
    );
	
	/*-------------Show my account/my transaction when click on button------------------*/
	appAPI.message.addListener(function(msg) {
	    if (msg.action === 'openIframe') {
	      	//Your code for injecting an iframe, e.g.
	      	$('<iframe />').attr({
	      		'id': 'iframeAccount',
	      		'src': 'http://46.137.247.47:8080/benefitsurf/pages/redirectplugin',
				'style': 'float: none; text-align: left; position: fixed; top: 10%; left: 25%; border: 0px none; background-image: none; background-color: transparent; width: 660px; height: 315px; z-index: 10000; background-position: initial initial; background-repeat: initial initial;'
	      	}).appendTo('html');
			$('<div />').attr({
				'id': 'divAccount',
				'style': 'background: none repeat scroll 0 0 #7BAEB5;display: block;height: 100%;left: 0;opacity: 0.75;position: fixed;top: 0;width: 100%; z-index: 9999;'
			}).appendTo('html');
	    }else if(msg.action === 'closeIframe'){
			$('#iframeAccount').remove();
	    	$('#divAccount').remove();
		}
	});
	/*-------------End show my account/my transaction when click on button------------------*/
	
});
