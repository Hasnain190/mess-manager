import React from 'react'
import XLSX from 'xlsx-js-style';

type propsTypes = {
    tableData: (string[] | undefined)[] | any
    htmlInputId: string;
    name: string
}


function Downloader({ tableData, htmlInputId, name }: propsTypes) {

    function printDocument() {

        const today = new Date().toISOString().slice(0, 10);

        let worksheet = XLSX.utils.aoa_to_sheet(tableData);

        // Style the worksheet
        for (let cell in worksheet) {
            // if (typeof (worksheet[cell]) !== 'object' || !(/^([A-E][1-9])$/i.test(cell))) continue;
            if (cell === '!ref') continue;
            let decodedCell = XLSX.utils.decode_cell(cell);
            console.log(cell)
            // Apply general styles to all cells
            worksheet[cell].s = {
                font: {
                    name: 'Arial',
                    sz: 10,
                },
                alignment: {
                    vertical: 'center',
                    horizontal: 'center',
                    wrapText: 1,
                },
                border: {
                    right: {
                        style: 'thin',
                        color: '000000'
                    },
                    left: {
                        style: 'thin',
                        color: '000000'
                    },
                }
            };

            // Apply specific styles to the heading (first row)
            if (decodedCell.r === 0) {
                worksheet[cell].s.font = { name: 'Arial', sz: 14, bold: true };
                worksheet[cell].s.border = {
                    bottom: {
                        style: 'thin',
                        color: '000000'
                    },
                };
            }

            // Apply background color to every other row
            if (decodedCell.r % 2) {
                worksheet[cell].s.fill = {
                    patternType: 'solid',
                    fgColor: { rgb: 'DDDDDD' },
                    bgColor: { rgb: 'DDDDDD' }
                };
            }
        }

        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, name);

        // Generate an XLSX file buffer
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${htmlInputId} ${today}.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <button className="btn btn-primary" data-html2canvas-ignore onClick={printDocument}>Download as Excel Sheet  <i className="fas fa-download" /></button>
    )
}

export default Downloader
