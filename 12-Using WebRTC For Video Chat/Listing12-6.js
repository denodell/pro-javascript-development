// Get a reference to the <video id="local-video"> element on the page
var localVideoElement = document.getElementById("local-video"),

    // Get a reference to the <video id="remote-video"> element on the page
    remoteVideoElement = document.getElementById("remote-video"),

    // Get a reference to the <button id="start-call"> element on the page
    startCallButton = document.getElementById("start-call"),

    // Get a reference to the <button id="join-call"> element on the page
    joinCallButton = document.getElementById("join-call"),

    // Get a reference to the <p id="room-name"> element on the page
    roomNameElement = document.getElementById("room-name"),

    // Create an instance of the Video Chat "class"
    videoChat = new VideoChat({

        // The Firebase database URL for use when loading and saving data to the cloud - create
        // your own personal URL at http://firebase.com
        firebaseUrl: "https://glaring-fire-9593.firebaseio.com/",

        // When the local webcam and microphone stream is running, set the "src" attribute
        // of the <div id="local-video"> element to display the stream on the page
        onLocalStream: function(streamSrc) {
            localVideoElement.src = streamSrc;
        },

        // When the remote webcam and microphone stream is running, set the "src" attribute
        // of the <div id="remote-video"> element to display the stream on the page
        onRemoteStream: function(streamSrc) {
            remoteVideoElement.src = streamSrc;
        }
    });

// When the <button id="start-call"> button is clicked, start a new video call and
// display the generated room name on the page for providing to the remote user
startCallButton.addEventListener("click", function() {

    // Start the call and get the chat room name
    var roomName = videoChat.startCall();

    // Display the chat room name on the page
    roomNameElement.innerHTML = "Created call with room name: " + roomName;
}, false);

// When the <button id="join-call"> button is clicked, join an existing call by
// entering the room name to join at the prompt
joinCallButton.addEventListener("click", function() {

    // Ask the user for the chat room name to join
    var roomName = prompt("What is the name of the chat room you would like to join?");

    // Join the chat by the provided room name - as long as this room name matches the
    // other, the two will be connected over a peer-to-peer connection and video streaming
    // will take place between the two
    videoChat.joinCall(roomName);

    // Display the room name on the page
    roomNameElement.innerHTML = "Joined call with room name: " + roomName;
}, false);