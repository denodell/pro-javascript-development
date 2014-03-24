// Define a "class" that can be used to create a peer-to-peer video chat in the browser. We
// have a dependency on Firebase, whose client API script should be loaded in the browser
// before this script executes
var VideoChat = (function(Firebase) {

    // Polyfill the required browser features to support video chat as some are still using
    // prefixed method and "class" names

    // The PeerConnection "class" allows the configuration of a peer to peer connection
    // between the current web page running on this device and the same running on another,
    // allowing the addition of data streams to be passed from one to another, allowing for
    // video chat-style appliations to be built
    var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,

        // The RTCSessionDescription "class" works together with the RTCPeerConnection to
        // initialize the peer to peer data stream using the Session Description Protocol (SDP)
        SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription,

        // The IceCandidate "class" allows instances of peer to peer "candidates" to be created
        //  - a candidate provides the details of the connection directly to our calling
        // partner, allowing the two browsers to chat
        IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate,

        // Define the two types of participant in a call, the person who initiated it and the
        // person who responded
        _participantType = {
            INITIATOR: "initiator",
            RESPONDER: "responder"
        },

        // Define an object containing the settings we will use to create our PeerConnection
        // object, allowing the two participants in the chat to locate each other's IP
        // addresses over the internet
        _peerConnectionSettings = {

            // Define the set of ICE servers to use to attempt to locate the IP addresses
            // of each of the devices participating in the chat. For best chances of
            // success, we include at least one server supporting the two different
            // protocols, STUN and TURN, which provide this IP lookup mechanism
            server: {
                iceServers: [{

                    // Mozilla's public STUN server
                    url: "stun:23.21.150.121"
                }, {

                    // Google's public STUN server
                    url: "stun:stun.l.google.com:19302"
                }, {

                    // Create your own TURN server at http://numb.viagenie.ca
                    url: "turn:numb.viagenie.ca",
                    username: "denodell%40gmail.com",
                    credential: "password"
                }]
            },

            // For interoperability between different browser manufacturers' code, we set
            // this DTLS/SRTP property to "true" as it is "true" by default in Firefox
            options: {
                optional: [{
                    DtlsSrtpKeyAgreement: true
                }]
            }
        };

    // Polyfill the getUserMedia() method, which allows us to access a stream of data provided
    // by the user's webcam and/or microphone
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

    // If the current browser does not support the "classes" and methods required for video
    // chat, throw an error - at the time of writing, Google Chrome, Mozilla Firefox and
    // Opera are the only browsers supporting the features required to support video chat
    if (!navigator.getUserMedia && !window.RTCPeerConnection) {
        throw new Error("Your browser does not support video chat");
    }

    // Define a generic error handler function which will throw an error in the browser
    function onError(error) {
        throw new Error(error);
    }

    // Define the VideoChat "class" to use to create a new video chat on a web page
    function VideoChat(options) {
        options = options || {};

        // Allow two callback functions, onLocalStream() and onRemoteStream() to be passed in.
        // The former is executed once a connection has been made to the local webcam and
        // microphone, and the latter is executed once a connection has been made to the remote
        // user's webcam and microphone. Both pass along a stream URL which can be used to
        // display the contents of the stream inside a <video> tag within the HTML page
        if (typeof options.onLocalStream === "function") {
            this.onLocalStream = options.onLocalStream;
        }

        if (typeof options.onRemoteStream === "function") {
            this.onRemoteStream = options.onRemoteStream;
        }

        // Initialize Firebase data storage using the provided URL
        this.initializeDatabase(options.firebaseUrl || "");

        // Set up the peer-to-peer connection for streaming video and audio between two devices
        this.setupPeerConnection();
    }

    VideoChat.prototype = {

        // Define the participant type for the current user in this chat - the "initiator", the
        // one starting the call
        participantType: _participantType.INITIATOR,

        // Define the participant type for the remote user in this chat - the "responder", the
        // one responding to a request for a call
        remoteParticipantType: _participantType.RESPONDER,

        // Create a property to store the name for the chat room in which the video call will
        // take place - defined later
        chatRoomName: "",

        // Define a property to allow loading and saving of data to the Firebase database
        database: null,

        // Define a method to be called when a local data stream has been initiated
        onLocalStream: function() {},

        // Define a method to be called when a remote data stream has been connected
        onRemoteStream: function() {},

        // Define a method to initialize the Firebase database
        initializeDatabase: function(firebaseUrl) {
            if (Firebase) {

                // Connect to our Firebase database using the provided URL
                var firebase = new Firebase(firebaseUrl);

                // Define and store the data object to hold all the details of our chat room
                // connections
                this.database = firebase.child("chatRooms");
            }
        },

        // Define a method to save a given name-value pair to Firebase, stored against the
        // chat room name given for this call
        saveData: function(chatRoomName, name, value) {
            if (this.database) {
                this.database.child(chatRoomName).child(name).set(value);
            }
        },

        // Define a method to load stored data from Firebase by its name and chat room name,
        // executing a callback function when that data is found - the connection will wait
        // until that data is found, even if it is generated at a later time
        loadData: function(chatRoomName, name, callback) {
            if (this.database) {

                // Make a request for the data asynchronously and execute a callback function once
                // the data has been located
                this.database.child(chatRoomName).child(name).on("value", function(data) {

                    // Extract the value we're after from the response
                    var value = data.val();

                    // If a callback function was provided to this method, execute it, passing
                    // along the located value
                    if (value && typeof callback === "function") {
                        callback(value);
                    }
                });
            }
        },

        // Define a method to set up a peer-to-peer connection between two devices and stream
        // data between the two
        setupPeerConnection: function() {
            var that = this;

            // Create a PeerConnection instance using the STUN and TURN servers defined
            // earlier to establish a peer-to-peer connection even across firewalls and NAT
            this.peerConnection = new PeerConnection(_peerConnectionSettings.server, _peerConnectionSettings.options);

            // When a remote stream has been added to the peer-to-peer connection, get the
            // URL of the stream and pass this to the onRemoteStream() method to allow the
            // remote video and audio to be presented within the page inside a <video> tag
            this.peerConnection.onaddstream = function(event) {

                // Get a URL that represents the stream object
                var streamURL = window.URL.createObjectURL(event.stream);

                // Pass this URL to the onRemoteStream() method, passed in on instantiation
                // of this VideoChat instance
                that.onRemoteStream(streamURL);
            };

            // Define a function to execute when the ICE framework finds a suitable candidate
            // for allowing a peer-to-peer data connection
            this.peerConnection.onicecandidate = function(event) {
                if (event.candidate) {

                    // Google Chrome often finds multiple candidates, so let's ensure we only
                    // ever get the first it supplies by removing the event handler once a
                    // candidate has been found
                    that.peerConnection.onicecandidate = null;

                    // Read out the remote party's ICE candidate connection details
                    that.loadData(that.chatRoomName, "candidate:" + that.remoteParticipantType, function(candidate) {

                        // Connect the remote party's ICE candidate to this connection forming
                        // the peer-to-peer connection
                        that.peerConnection.addIceCandidate(new IceCandidate(JSON.parse(candidate)));
                    });

                    // Save our ICE candidate connection details for connection by the remote
                    // party
                    that.saveData(that.chatRoomName, "candidate:" + that.participantType, JSON.stringify(event.candidate));
                }
            };
        },

        // Define a method to get the local device's webcam and microphone stream and handle
        // the handshake between the local device and the remote party's device to set up the
        // video chat call
        call: function() {
            var that = this,

                // Set the constraints on our peer-to-peer chat connection. We want to be
                // able to support both audio and video so we set the appropriate properties
                _constraints = {
                    mandatory: {
                        OfferToReceiveAudio: true,
                        OfferToReceiveVideo: true
                    }
                };

            // Get the local device's webcam and microphone stream - prompts the user to
            // authorize the use of these
            navigator.getUserMedia({
                video: true,
                audio: true
            }, function(stream) {

                // Add the local video and audio data stream to the peer connection, making
                // it available to the remote party connected to that same peer-to-peer
                // connection
                that.peerConnection.addStream(stream);

                // Execute the onLocalStream() method, passing the URL of the local stream,
                // allowing the webcam and microphone data to be presented to the local
                // user within a <video> tag on the current HTML page
                that.onLocalStream(window.URL.createObjectURL(stream));

                // If we are the initiator of the call, we create an offer to any connected
                // peer to join our video chat
                if (that.participantType === _participantType.INITIATOR) {

                    // Create an offer of a video call in this chat room and wait for an
                    // answer from any connected peers
                    that.peerConnection.createOffer(function(offer) {

                        // Store the generated local offer in the peer connection object
                        that.peerConnection.setLocalDescription(offer);

                        // Save the offer details for connected peers to access
                        that.saveData(that.chatRoomName, "offer", JSON.stringify(offer));

                        // If a connected peer responds with an "answer" to our offer, store
                        // their details in the peer connection object, opening the channels
                        // of communication between the two
                        that.loadData(that.chatRoomName, "answer", function(answer) {
                            that.peerConnection.setRemoteDescription(
                                new SessionDescription(JSON.parse(answer))
                            );
                        });
                    }, onError, _constraints);

                // If we are the one joining an existing call, we answer an offer to set up
                // a peer-to-peer connection
                } else {

                    // Load an offer provided by the other party - waits until an offer is
                    // provided if one is not immediately present
                    that.loadData(that.chatRoomName, "offer", function(offer) {

                        // Store the offer details of the remote party, using the supplied
                        // data
                        that.peerConnection.setRemoteDescription(
                            new SessionDescription(JSON.parse(offer))
                        );

                        // Generate an "answer" in response to the offer, enabling the
                        // two-way peer-to-peer connection we need for the video chat call
                        that.peerConnection.createAnswer(function(answer) {

                            // Store the generated answer as the local connection details
                            that.peerConnection.setLocalDescription(answer);

                            // Save the answer details, making them available to the initiating
                            // party, opening the channels of communication between the two
                            that.saveData(that.chatRoomName, "answer", JSON.stringify(answer));
                        }, onError, _constraints);
                    });
                }
            }, onError);
        },

        // Define a method which initiates a video chat call, returning the generated chat
        // room name which can then be given to the remote user to use to connect to
        startCall: function() {

            // Generate a random 3-digit number with padded zeros
            var randomNumber = Math.round(Math.random() * 999);

            if (randomNumber < 10) {
                randomNumber = "00" + randomNumber;
            } else if (randomNumber < 100) {
                randomNumber = "0" + randomNumber;
            }

            // Create a simple chat room name based on the generated random number
            this.chatRoomName = "room-" + randomNumber;

            // Execute the call() method to start transmitting and receiving video and audio
            // using this chat room name
            this.call();

            // Return the generated chat room name so it can be provided to the remote party
            // for connection
            return this.chatRoomName;
        },

        // Define a method to join an existing video chat call using a specific room name
        joinCall: function(chatRoomName) {

            // Store the provided chat room name
            this.chatRoomName = chatRoomName;

            // If we are joining an existing call, we must be the responder, rather than
            // initiator, so update the properties accordingly to reflect this
            this.participantType = _participantType.RESPONDER;
            this.remoteParticipantType = _participantType.INITIATOR;

            // Execute the call() method to start transmitting and receiving video and audio
            // using the provided chat room name
            this.call();
        }
    };

    // Return the VideoChat "class" for use throughout the rest of the code
    return VideoChat;
}(Firebase || function() {}));