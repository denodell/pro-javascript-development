/**
Convert shallow JS object to URL-encoded form data.
@param {Object} JavaScript object literal to covert into URL-encoded form data
@return {String|null} URL encoded form data. null if empty or if object could not be converted
*/

function serialize(obj) {
    var i,
        formData = '';

    if (typeof obj === 'string') {
        formData = obj;
    } else if (typeof obj === 'object') {
        for (i in obj) {
            if (obj.hasOwnProperty(i) && typeof obj[i] === 'string') {
                formData += '&' + i + '=' + encodeURIComponent(obj[i]);
            }
        }
        if (formData.length) {
            formData = formData.substring(1);
        }
    }

    return formData.length ? formData : null;
}