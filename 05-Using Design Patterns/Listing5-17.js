// The ajaxCall method can make cross-browser Ajax calls as follows
ajaxCall("get", "/", function(response) {
    alert("Response recieved: " + response);
});

ajaxCall("post", "/", function(response) {
    alert("Response recieved: " + response);
}, "userID=1234567890&name=Den%20Odell");