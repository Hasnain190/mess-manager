import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function Downloader({ htmlInputId, name }) {


    function printDocument() {
        const input = document.getElementById(htmlInputId);

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${name}.pdf`);
            })
            ;
    }

    return (
        <button class="btn btn-primary" data-html2canvas-ignore onClick={printDocument}>Download as PDF  <i className="fas fa-download" /></button>

    )
}

export default Downloader