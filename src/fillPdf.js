import { PDFDocument, StandardFonts } from 'pdf-lib';
import templateBytes from './assets/219.pdf'
import fontBytes from './assets/gost_common.ttf';

export async function fillAndSavePdf(consumption) {
  try {
    // Загружаем PDF
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // Встраиваем шрифт
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Заполняем поля
    const fieldsMap = {
      drob: consumption.drob,
      spirit: consumption.spirit,
      grunt: consumption.grunt,
      emal: consumption.emal
    };

    Object.entries(fieldsMap).forEach(([name, value]) => {
      const field = form.getTextField(name);
      field.setText(value);
      field.updateAppearances(customFont);
    });

    // Генерируем PDF
    const pdfBytes = await pdfDoc.save();

    // Создаём blob и ссылку для скачивания
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${Date.now()}.pdf`; // имя файла по таймштампу
    a.click();
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Ошибка при генерации PDF:', error);
    alert('Ошибка при генерации PDF');
    return false;
  }
}