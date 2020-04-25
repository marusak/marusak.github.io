let term = null;
let buffer = "";

const commands = {
    "help": "Known commands: 'cat', 'help', 'locale', 'mail', 'man', 'whoami'",
    "man": "yes",
    "cat": "no",
    "mail": "personal: marusak.matej@gmail.com\nwork: mmarusak@redhat.com",
    "locale": `LANG_NATIVE=sk_SK.UTF-8
LANG_C1_LEVEL=en_US.UTF-8
LANG_B1_LEVEL=de_de.UTF-8
LC_TIME="UTC+1"
LC_NAME="Matej Marušák"
LC_ADDRESS="Brno, Czech Republic"
C="sure"`,
}

function whoami(opt) {
    switch(opt) {
        case "--help":
            term.write(`
Usage: whoami [OPTION]
Get info about me.

    --photo    Display photo. (Needs at least 120 characters wide screen)
    --help     display this help and exit
`);
            break;
        case "--photo":
            term.write(photo);
            break;
        default:
            term.write("\nHey, my name is Matej Marusak and I do computer stuff. See '--help' for more info.");
    }
}

function do_cmd() {
    if (buffer) {
        const cmd = buffer.split(" ")[0];
        if (cmd === "whoami") {
            const command = buffer.split(" ");
            if (command.length > 2)
                term.write("\n Unsupported combination of options. See '--help'.");
            else
                whoami(command.length === 2 ? command[1] : null)
        } else if (commands[cmd])
            term.write("\n" + commands[cmd]);
        else
            term.write("\n" + cmd +": command not found");
    }
    buffer = "";
    term.write("\n$ ");
}

function resize() {
    const element = document.getElementById("terminal");

    const realHeight = term._core._renderService.dimensions.actualCellHeight;
    const realWidth = term._core._renderService.dimensions.actualCellWidth;
    if (realHeight && realWidth && realWidth !== 0 && realHeight !== 0)
        term.resize(
            Math.floor((element.clientWidth - 22) / realWidth),
            Math.floor((element.clientHeight - 11) / realHeight)
        );
}

function attach_terminal() {
    document.getElementById("overview-note").innerHTML = ""
    document.getElementById("main").className="term";

    const term_el = document.getElementById('terminal');
    term_el.removeAttribute("hidden");

    term = new Terminal({
        screenKeys: true,
        cursorBlink: true,
        fontSize: 16,
        fontFamily: 'Menlo, Monaco, Consolas, monospace',
        convertEol: true,
    });
    term.open(term_el);

    term.write("Type 'help' to see available commands\n$ ");

    term.onData(data => {
        // TODO assuming one character, might be a string though
        if (data === "\r")
            do_cmd();
        else {
            buffer += data;
            term.write(data);
        }
    });

    resize();
    term_el.focus();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mm").addEventListener("click", ev => {
        if (ev.getModifierState("Alt")) {
            attach_terminal();
        } else {
            document.getElementById("overview-note").innerHTML = "Nah... Try <mark>Alt</mark>ernative"
        }
    });
});
