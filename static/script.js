const postcardTextInput = document.getElementById('postcard-text-input');
postcardTextInput.addEventListener('input', (event) => {
    const postcardText = document.getElementById('postcard-text');
    postcardText.innerText = postcardTextInput.value;
});

const selectFont = document.getElementById('select-font');
selectFont.addEventListener('change', (event) => {
    const postcardText = document.getElementById('postcard-text');
    postcardText.style.fontFamily = selectFont.value;
});

const selectFontSize = document.getElementById('select-font-size');
selectFontSize.addEventListener('change', (event) => {
    const postcardText = document.getElementById('postcard-text');
    postcardText.style.fontSize = selectFontSize.value;
    postcardText.style.lineHeight = selectFontSize.value;
});

const exportToPdf = document.getElementById('export-to-pdf');
exportToPdf.addEventListener('click', (event) => {
    var HTML_Width = $("#postcard").width();
    var HTML_Height = $("#postcard").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($("#postcard")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save("postcard.pdf");
    });
});

// var doc = new jsPDF();
// doc.fromHTML(
//     $('#postcard').html(), 15, 15, {
//         'width': 170,
//         'elementHandlers': {
//             '#editor': function (element, renderer) {
//                 return true;
//             }
//         }
//     },
//     function(bla) {
//         doc.save('saveInCallback.pdf');
//     }
// );

