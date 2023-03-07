function handleKeyPress(event) {
    if (event.keyCode === 13) {
        execute();
    }
}

function execute() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    const command = input.toLowerCase().trim();
    let reply = "";

    switch (command) {
        case "":
            break;
        case "welcome":
            reply = "おかえりなさいませ、ご主人様！"
            break;
        case "help":
            reply = "The user guide has not been finished yet.";
            break;
        case "ls":
            reply = "Total 3. Click on &#x60;&lt;NAME&gt;&#x60; to open a folder.";
            table = createTable();
            break;
        case "clear":
            break;
        case "about":
            reply = "来自1885的互联网偶像！王牌级gamer！" + "<br>" + "关注永雏塔菲谢谢喵！";
            break;
        default:
            reply = input + ": command not found";
            break;
    }

    const p = document.createElement("p");

    if (command == "ls") {
        const t = document.createElement("table-container");
        t.appendChild(table);
        p.appendChild(table)
    } else {
        p.insertAdjacentHTML("beforeend", "<br>");
    }

    p.insertAdjacentHTML("beforeend", reply);
    p.insertAdjacentHTML("afterbegin", `<span class="command">:~$ ` + input + "</span>");
    p.insertAdjacentHTML("afterbegin", `<span class="username">you@eephibot</span>`);

    output.appendChild(p);    
    if (command == "clear") {
        clearTerminal();
    }
    output.scrollTop = output.scrollHeight;
    document.getElementById("input").value = "";
}

function generatePrefix() {
    const elements = document.getElementsByClassName("prefix");

    for (let i = 0; i < elements.length; i++) {
        const content = document.createElement("span");
        content.innerHTML = "<span class=username>you@eephibot</span><span class=command>:~&#36;&nbsp;</span>";
        elements[i].appendChild(content);
    }
}

function clearTerminal() {
    document.getElementById("output").innerHTML = "" ;
}

// generate prefix when the page is loaded
window.addEventListener("load", generatePrefix);

// focus on the input field when the page loads
document.getElementById("input").focus();