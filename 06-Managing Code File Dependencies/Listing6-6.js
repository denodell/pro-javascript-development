requirejs.config({
    paths: {
        "jquery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
            // If the CDN fails, load from this local file instead
            "lib/jquery-1.10.2"
        ]
    }
});