import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'

export  async function pdfFromUrl(data) {

  const formUrl = './219.pdf';
  const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const fontUrl = './gost_common.ttf';
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formBytes);
  pdfDoc.registerFontkit(fontkit);
  const gostFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();
  form.getTextField('drob').setText(data.drob);
  form.getTextField('spirit').setText(data.spirit);
  form.getTextField('grunt').setText(data.grunt);
  form.getTextField('emal').setText(data.emal);
  //

  form.updateFieldAppearances(gostFont);
  

  const pdfBytes = await pdfDoc.save();


  // Создаём ссылку для скачивания
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');

  // Имя файла — таймштамп
  link.download = `${Date.now()}.pdf`;
  link.href = URL.createObjectURL(blob);
  link.click();

  // Очистка URL
  URL.revokeObjectURL(link.href);

}