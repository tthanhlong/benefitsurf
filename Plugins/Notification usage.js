// Example Code:

// This API allows you to dynamically create Crossrider notifications

// Show a noticiation: (You can customize it with the following params)

appAPI.notifier.show({
 'name':'my-notification-name', // Pick a distinctive name. it will not be displayed for the users but used by the system for identification.
 'title':'Notification Title', // Notification title [optional]
 'body':'<span style="font-weight:bold;color:red;">Hello :)</span>', // Notification body - supports HTML.
 'link':'http://mysite.com/welcome', // Notification target link. Will be opened when user clicks the notification
 'theme':'default', // Notification theme: "default", "facebook", "grey", "cyan", "orange", "lime", "navy", "dark-grey", "light-grey", "light-cyan", "peach", "light-green", "white-black", "white-blue", "white-darkred", "white-lime"
 'position':'top-right', // Notification position: "top-right", "top-left", "bottom-left", "bottom-right"
 'icon':'http://mysite.com/img.png', // Notification icon url [optional]
 'close':true, // Show close [X] icon
 'sticky':true, // If you set this to true the notification will not fade until the user clicks or closes it
 'fadeAfter':5, // Fade after X seconds (default 5 seconds) - valid only if sticky:false
 'width':'400px', // Notification width (default 275)
 'closeWhenClicked':true // Notification closes right after user click (default true)
});

// Nnotification events:
// You can listen to all notification events (display, click, hover, close, fade) 
// All events gets a data object as a parameter

// Notification display event - fires when the notification is displayed to the user
appAPI.notifier.events.add('display', function (data) {
  alert(data.name);
});

// Notification click event - fires when the user clicks the notification
var clickCallback = function (data) {
  alert(data.name);
};
appAPI.notifier.events.add('click', clickCallback);

// Notification hover event - fires when the user hovers the notification for the first time
appAPI.notifier.events.add('hover', function (data) {
  alert(data.name);
});

// Notification close event - fires when the user has clicked the close [X] button
appAPI.notifier.events.add('close', function (data) {
  alert(data.name);
});

// Notification fade event - fires when the notification faded out. 
appAPI.notifier.events.add('fade', function (data) {
  alert(data.name);
});

// Remove listener to a specific event
appAPI.notifier.events.remove('click', clickCallback);

// Remove (close) and reset the current notification from the page
// This is usefull when you want to close the notification using your own events
appAPI.notifier.reset();