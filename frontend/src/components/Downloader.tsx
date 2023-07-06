import React from 'react'

import { utils, write } from 'xlsx';


function Downloader({
    tableData,
    htmlInputId,
    name,
}: any) {


    function printDocument() {
        // const input = document.getElementById(htmlInputId);

        const workbook = utils.book_new();

        const worksheet = utils.json_to_sheet(tableData)

        utils.book_append_sheet(workbook, worksheet, name)

        // Generate an XLSX file buffer
        const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


        const url = URL.createObjectURL(blob);


        const link = document.createElement('a');
        link.href = url;
        link.download = `${htmlInputId}.xlsx`;
        link.click();


        URL.revokeObjectURL(url);
    }

    return (
        <button className="btn btn-primary" data-html2canvas-ignore onClick={printDocument}>Download as Excel Sheet  <i className="fas fa-download" /></button>

    )
}

export default Downloader