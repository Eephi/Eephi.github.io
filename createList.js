function printTable() {
    // add table to HTML document
    const tableContainer = document.getElementById("table-container");
    table = createTable();
    tableContainer.appendChild(table);
}

function createTable() {
    const data = [
        ["USER", "DATE  MODIFIED", "NAME"],
        ["MsEspeon", "23-03-06  00:00", "Note"],
        ["MsEspeon", "23-03-06  00:00", "Archive"],
        ["MsEspeon", "23-03-06  00:00", "About"]
    ];
  
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
  
    // create header row
    for (let i = 0; i < data[0].length; i++) {
        const headerCell = document.createElement("td");
        headerCell.textContent = data[0][i];
        if (i == 0)
            headerCell.setAttribute("style", "padding: 0 2.7em 0 1em;");
        if (i == 1)
            headerCell.setAttribute("style", "padding: 0 1.1em 0 0.5em");
        if (i == 2)
            headerCell.setAttribute("style", "padding: 0 2em 0 0.5em");
        headerRow.appendChild(headerCell);
    }

    const headerWrap = document.createElement("tr");
    headerWrap.appendChild(headerRow)
    table.appendChild(headerWrap);

    // create data rows
    for (let i = 1; i < data.length; i++) {
        const dataRow = document.createElement("tr");
        dataRow.setAttribute("style", "text-align: left;");
        for (let j = 0; j < data[i].length; j++) {
            const dataCell = document.createElement("td");
            dataCell.textContent = data[i][j];
            if (j == 0)
                dataCell.setAttribute("style", "padding: 0 0.5em 0 1em;");
            else if (j != data[i].length-1)
                dataCell.setAttribute("style", "padding: 0 0.5em 0 0.5em;");
            else {
                if (i == 1)
                    dataCell.setAttribute("style", "padding: 0 1.5em 0 0.5em;");
                if (i == 2)
                    dataCell.setAttribute("style", "padding: 0 0em 0 0.5em;");
                if (i == 3)
                    dataCell.setAttribute("style", "padding: 0 1em 0 0.5em;");
            }
            dataRow.appendChild(dataCell);
        }
        const dataLink = document.createElement("a");
            dataLink.setAttribute("href", "https://google.com");
        dataLink.appendChild(dataRow);

        const linkWrap = document.createElement("tr");
        linkWrap.appendChild(dataLink)
        table.appendChild(linkWrap);
    }
    return table;
}
  
// call the function when the page is loaded
window.addEventListener("load", printTable);
  