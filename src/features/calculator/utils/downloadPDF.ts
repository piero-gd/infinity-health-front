// Tipos para jsPDF
declare global {
  interface Window {
    jspdf: typeof import('jspdf');
  }
}

export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  try {
    if (!element) throw new Error('No se proporcionó ningún elemento');
    
    // Crear PDF con márgenes
    const doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;
    
    // Función para agregar texto con manejo de saltos de página
    const addText = (text: string, isHeader = false) => {
      if (y > 270) { // Nueva página si se pasa del margen inferior
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(isHeader ? 16 : 12);
      
      // Agregar espacios al texto para que se vea mejor en el PDF
      const textWithSpaces = text.replace(/\s/g, '');
      // Dividir texto en líneas
      const lines = doc.splitTextToSize(textWithSpaces, pageWidth - (margin * 2 ) );
      
      // Agregar cada línea
      lines.forEach((line: string) => {
        if (y > 270) {
          doc.addPage();
          y = 40;
        }
        doc.text(line, margin, y);
        y += 1; // Espaciado fijo entre líneas
      });

      
      // Espacio adicional después de cada bloque
      y += isHeader ? 1 : 5;
    };
     // Ajustar posición inicial más abajo
    y = 40;
    
    //LOGO DE INFINITY
    doc.addImage('../public/img/health-logo-light-mode.png', 'PNG', pageWidth - margin - 40, margin + 10, 40, 13);
    
    //TITULO
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(fileName, margin, y);
    y += 10;
    
    // Línea decorativa
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    //FECHA
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Dieta generada el: ${new Date().toLocaleDateString()}`, margin, y);
    y += 5;
    
    // Procesar cada comida
    element.querySelectorAll('.border-gray-100').forEach(meal => {
      // Obtener el nombre de la comida y las calorías
      const mealName = meal.querySelector('h3')?.textContent?.trim() || '';
      addText('');
      const mealCalories = meal.querySelector('.bg-yellow-100')?.textContent?.trim() || '';
      
      // Agregar nombre de la comida en negrita
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(mealName, margin, y);
      addText('');
      
      // Agregar calorías como subtítulo
      doc.setDrawColor(23, 152, 224);
      doc.setFont('helvetica', 'bold');
      doc.text(mealCalories, margin, y);
      addText('');
      
      // Procesar los items de la comida
      const items = meal.querySelectorAll('li');
      items.forEach(item => {
        const food = item.querySelector('.text-gray-700')?.textContent?.trim() || '';
        const quantity = item.querySelector('.text-gray-500')?.textContent?.trim() || '';
        const calories = item.querySelector('.text-gray-400')?.textContent?.trim() || '';
        
        // Formatear línea de ítem con mejor espaciado
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        
        // Asegurar que haya espacio suficiente para la siguiente línea
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
        
        // Agregar viñeta
        doc.text('•', margin, y);
        
        // Agregar nombre del alimento
        doc.text(food, margin + 5, y);
        //condicional para salto de linea y aumentar x para bajar
        if (y > 260) {
          y += 3;
        }
        
        
        // Agregar cantidad alineada
        const quantityX = margin + 100; // Ajusta este valor según necesites
        doc.text(quantity, quantityX, y);
        
        // Agregar calorías alineadas a la derecha
        doc.setDrawColor(58, 176, 249);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        const caloriesX = doc.internal.pageSize.getWidth() - margin - 5;
        doc.text(calories, caloriesX, y, { align: 'right' });
        
        
        y += 5; // Espacio entre líneas
      });
      
      // Agregar espacio entre comidas
      addText('');
    });

    //AÑADIR INFORMACIÓN DE INFINITY

    //añadir linea
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    addText('');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Este es un plan referencial, para una atención especializada te recomendamos \n consultar con tu nutricionista/o médico  de cabecera.`, margin + 15, y+2);
    y += 5;

    // Guardar PDF
    doc.save(`${fileName}.pdf`);
    
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  }
};