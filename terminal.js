function handleKeyPress(event) {
    if (event.keyCode === 13) {
        execute();
    }
}
function execute() {
    const input = document.getElementById("command").value;
    const terminal = document.getElementById("output");
    const command = input.toLowerCase().trim();
    let output = "";

    switch (command) {
        case "":
            break;
        case "help":
            output = "The user guide has not been finished yet.";
            break;
        case "about":
            output = "来自1885的互联网偶像！王牌级gamer！" + "<br>" + "关注永雏塔菲谢谢喵！";
            break;
        default:
            output = input + ": command not found";
            break;
    }

    const p = document.createElement("p");
    p.innerHTML = "<br>" + output;
    p.insertAdjacentHTML("afterbegin", `<span class="output-prefix">:~$ ` + input + "</span>");
    p.insertAdjacentHTML("afterbegin", `<span class="output-username">you@eephibot</span>`);
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
    document.getElementById("command").value = "";
}

// focus on the input field when the page loads
document.getElementById("command").focus();