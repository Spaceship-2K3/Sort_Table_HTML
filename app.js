/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 *   todo : ( co nen tang hay giam )
 */

let sortTableByColumn = (table, column, asc = true) => {
    /** là một cách để truy cập vào phần tử đầu tiên trong mảng các
    phần tử <tbody> trong một bảng HTML. */
    const tBody = table.tBodies[0];
    // Biến NodeList tBody thành mảng, các phần tử gồm tr
    const rows = Array.from(tBody.querySelectorAll("tr"));
    // Để biết là muốn tăng hay giảm
    const dirModifier = asc ? 1 : -1;

    // Sort each row
    // return 1 or -1  de kiem tra cach no sap xep
    // Lay noi dung van ban cho tung hang trong bang, o tung chi mu column
    const sortedRows = rows.sort((a, b) => {
        const aColText = a
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();
        const bColText = b
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();

        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-asc", asc);
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-desc", !asc);
};

document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
    headerCell.addEventListener("click", () => {
        const tableElement =
            headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(
            headerCell.parentElement.children,
            headerCell
        );
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

const points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
    return a - b;
});
console.log(points);
