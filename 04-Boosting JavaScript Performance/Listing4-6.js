function loadScript(src, onLoad) {
    var scriptTag = document.createElement("script");

    scriptTag.src = src;
    scriptTag.onload = onLoad;
    scripTag.onreadystatechange = function() {
        if (scriptTag.readyState === 4) {
            onLoad();
        }
    };
    document.body.appendChild(scriptTag);
}