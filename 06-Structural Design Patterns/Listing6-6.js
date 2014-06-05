// The ajaxCall() facade function can make cross-browser Ajax calls as follows
ajaxCall("get", "/user/12345", function(response) {
    alert("HTTP GET response received. User data: " + response);
});

ajaxCall("post", "/user/12345", function(response) {
    alert("HTTP POST response received. New user data: " + response);
}, "company=AKQA&name=Den%20Odell");