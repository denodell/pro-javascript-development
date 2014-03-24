requirejs.config({
    paths: {
        "jquery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
            // If the CDN fails, load from this local file instead
            "lib/jquery-1.10.2"
        ]
    }
});

require(["jquery"], function($) {
    var $form = $("#form"),
        $email = $("#email");

    $form.on("submit", function(e) {
        e.preventDefault();
        require(["lib/validation-plugin"], function() {
            if ($email.isValidEmail()) {
                $form.get(0).submit();
            } else {
                $email.addClass("error").focus();
            }
        });
    });

    $email.on("keyup", function() {
        $email.removeClass("error");
    });
});