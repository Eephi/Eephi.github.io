function handleKeyPress(event) {
    if (event.keyCode === 13) {
        execute();
    }
}

function execute() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    const container = document.getElementById("container");
    const command = input.toLowerCase().trim();
    
    let splits = command.split(/\s+/);
    let cmd = splits[0];
    let arg = splits.slice(1).join(" ");
    let reply = "";
    let table = "";
    let inputFlag = 1;
    
    switch (cmd) {
        case "":
            break;
        case "about":
            reply = "Hi! My name is <span class=highlight>MsEspeon</span>.<br>I'm a 17-year-old high school student who codes as a hobby.<br>I'm interested in <span class=highlight>Anime</span>, <span class=highlight>Manga</span> and <span class=highlight>VTuber/VUP</span>.<br>Feel free to contact me if you are a VTuber/VUP from Bilibili.";
            break;
        case "cat":
            reply = "<img src=https://s2.loli.net/2023/03/07/jWZLSJbGV9q6daC.jpg width=150 height=150></img><br>来自1885的互联网偶像！王牌级gamer！<br>关注<a href=https://space.bilibili.com/1265680561 target=_blank>永雏塔菲</a>谢谢喵！";
            break;
        case "clear":
            break;
        case "contact":
            reply = "Mail: <a href=mailto:missingespeon@gmail.com target=_blank>missingespeon@gmail.com</a> or contact me on <a href=https://github.com/Eephi/eephi.github.io/issues target=_blank>GitHub Issues</a>."
            break;
        case "echo":
            if (arg)
                reply = arg;
            else
                reply = " ";
            break;
        case "help":
            reply = "";
            table = helpList();
            break;
        case "ls":
            reply = "Total 3. Click on &#x60;<span class=highlight>&lt;NAME&gt</span>;&#x60; to open a folder.";
            table = createTable();
            break;
        case "repo":
            reply = "Redirecting to <a href=https://github.com/Eephi/eephi.github.io target=_blank>https://github.com/Eephi/eephi.github.io</a> ..."
            break;
        case "welcome":
            reply = "おかえりなさいませ、ご主人様！";
            break;
        default:
            inputFlag = 0;
            reply = input + ": command not found";
            break;
    }

    if (splits.length != 1 && cmd != "echo" && inputFlag) {
        reply = "Usage: " + cmd;
        cmd = "Usage";
    }
    
    const p = document.createElement("p");

    if (cmd == "ls" || cmd == "help") {
        const t = document.createElement("table-container");
        t.appendChild(table);
        p.appendChild(table);
    } else {
        p.insertAdjacentHTML("beforeend", "<br>");
    }

    p.insertAdjacentHTML("beforeend", reply);
    p.insertAdjacentHTML("afterbegin", `<span class="command">:~$ ` + input + "</span>");
    p.insertAdjacentHTML("afterbegin", `<span class="username">you@eephibot</span>`);

    if (cmd == "repo") {
        window.open("https://github.com/Eephi/eephi.github.io", "_blank");
    }

    output.appendChild(p);    
    if (cmd == "clear") {
        clearTerminal();
    }
    container.scrollTop = container.scrollHeight;
    document.getElementById("input").value = "";
    inputFlag = 1;
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