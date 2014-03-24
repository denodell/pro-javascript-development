require(["jquery", "lib/validation-plugin"], function($) {
    var $form = $("#form"),
        $email = $("#email");

    $form.on("submit", function(e) {
        e.preventDefault();
        if ($email.isValidEmail()) {
            $form.get(0).submit();
        } else {
            $email.addClass("error").focus();
        }
    });

    $email.on("keyup", function() {
        $email.removeClass("error");
    });
});