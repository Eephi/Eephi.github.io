function helpList() {
    const data = [
        ["about", "|", "About MsEspeon", "|", "about"],
        ["cat", "|", "Get a lovely cat", "|", "cat"],
        ["clear", "|", "Clear terminal screen", "|", "clear"],
        ["contact", "|", "Contact me", "|", "contact"],
        ["echo", "|", "Display line of text/string", "|", "echo [arg ...]"],
        ["help", "|", "Check available commands", "|", "help"],
        ["ls", "|", "List files in the current directory", "|", "ls"],
        ["repo", "|" ,"Open this website's github repository", "|", "repo"],
        ["welcome", "|", "Receive a warm welcome", "|", "welcome"]
    ];
  
    const table = document.createElement("table");

    // create data rows
    for (let i = 0; i < data.length; i++) {
        const dataRow = document.createElement("tr");
        dataRow.setAttribute("style", "text-align: left;");
        for (let j = 0; j < data[i].length; j++) {
            const dataCell = document.createElement("td");
            dataCell.textContent = data[i][j];
            dataCell.setAttribute("style", "padding: 0 0.5em 0 0.5em;");
            dataRow.appendChild(dataCell);
        }
        table.appendChild(dataRow);
    }
    return table;
}