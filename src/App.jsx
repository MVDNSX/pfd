import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { pdfFromUrl } from './updatePdfFromUrl'
import Viewer from './Viewer'

export default function App() {
  const [area, setArea] = useState('') // площадь в м²
  const [results, setResults] = useState(null)

  const handleCalculate = () => {
  const areaNum = parseFloat(area);
  if (isNaN(areaNum) || areaNum <= 0) {
    alert('Введите корректное значение площади');
    return;
  }
  const consumption = {
    drob: (areaNum * 0.5).toFixed(2) + ' кг/м2',
    spirit: (areaNum * 1.29).toFixed(2) + ' л/м2',
    grunt: (areaNum * 0.16).toFixed(2) + ' кг/м2',
    emal: (areaNum * 0.235).toFixed(2) + ' кг/м2',
  };

  pdfFromUrl(consumption)
  setResults(consumption);
};




  return (
    <div className="h-screen flex bg-gray-100">
      {/* Левая панель */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Настройки PDF</h2>
        <label className="block mb-2 font-medium">Площадь (м²)</label>
          <input
          type="number"
          step="any"
          placeholder="Введите площадь"
          className="p-2 border rounded mb-4 w-full"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
          <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleCalculate}
        >
          Рассчитать расход
        </button>

        {results && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Результаты:</h3>
            <ul className="list-disc pl-5">
              <li>Дробь: {results.drob}</li>
              <li>Вайт спирит: {results.spirit}</li>
              <li>Грунтовка: {results.grunt}</li>
              <li>Эмаль: {results.emal}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div className="flex-1 p-4">
        <Viewer/>
      </div>
      </div>
  );
}