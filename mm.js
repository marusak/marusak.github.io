document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mm").addEventListener("click", ev => {
        if (ev.getModifierState("Alt")) {
            document.getElementById("overview-note").innerHTML = ""
            // TODO forward on the page
        } else {
            document.getElementById("overview-note").innerHTML = "Nah... Try <mark>Alt</mark>ernative"
        }
    });
});
