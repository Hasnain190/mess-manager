import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function Downloader({
    htmlInputId,
    name
}: any) {


    function printDocument() {
        const input = document.getElementById(htmlInputId);

        // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                // @ts-expect-error TS(2575): No overload expects 4 arguments, but overloads do ... Remove this comment to see the full error message
                pdf.addImage(imgData, 'JPEG', 0, 0);
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