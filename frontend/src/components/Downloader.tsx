import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function Downloader({
    htmlInputId,
    name
}: any) {


    function printDocument() {
        const input = document.getElementById(htmlInputId);
        if (!input) {
            console.log("error in the downloader printDocument function .Fix it now!")
            return;
        }
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                // FIXME: the hieght and width arguments needs according to length of given and should not be hard coded like this
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${name}.pdf`);
            })
            ;
    }

    return (
        <button className="btn btn-primary" data-html2canvas-ignore onClick={printDocument}>Download as PDF  <i className="fas fa-download" /></button>

    )
}

export default Downloader