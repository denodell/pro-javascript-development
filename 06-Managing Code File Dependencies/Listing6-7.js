define(["jquery"], function($) {
    $.fn.isValidEmail = function() {
        var isValid = true,
            regEx = /\S+@\S+\.\S+/;

        this.each(function() {
            if (!regEx.test(this.value)) {
                isValid = false;
            }
        });

        return isValid;
    };
});