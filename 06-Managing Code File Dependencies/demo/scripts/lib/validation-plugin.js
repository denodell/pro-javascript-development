define(["jquery"], function($) {
    $.fn.isValidEmail = function() {
        var isValid = true,
            // Regular expression that matches if one or more non-whitespace characters are
            // followed by an @ symbol, followed by one or more non-whitespace characters,
            // followed by a dot (.) character, and finally followed by one or more non-
            // whitespace characters
            regEx = /\S+@\S+\.\S+/;

        this.each(function() {
            if (!regEx.test(this.value)) {
                isValid = false;
            }
        });

        return isValid;
    };
});