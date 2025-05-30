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
    let x = 20;
    
    // Función para agregar texto con manejo de saltos de página
    const addText = (text: string, isHeader = false) => {
      if (y > 270) { // Nueva página si se pasa del margen inferior
        doc.addPage();
        y = 20;
        x = 20;
      }
      
      doc.setFontSize(isHeader ? 16 : 12);
      
      // Dividir texto en líneas
      const lines = doc.splitTextToSize(text, pageWidth - (margin * 2));
      
      // Agregar cada línea
      lines.forEach((line: string) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
          x = 3;
        }
        doc.text(line, x, y);
        y += 1; // Espaciado fijo entre líneas
      });

      
      // Espacio adicional después de cada bloque
      y += isHeader ? 1 : 5;
    };
    
    //TITULO
    addText(`${fileName}`, true);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    //FECHA
    addText(`Fecha: ${new Date().toLocaleDateString()}`, false);
    // Agregar espacio adicional 
    addText('', false);
    
    // Procesar elementos principales
    element.querySelectorAll('h3, li')
    .forEach(el => {
    const text = el.textContent?.trim();
    if (!text) return;
    
    const isHeader = el.tagName === 'H3';
    const isListItem = el.tagName === 'LI';
    
    // Agregar viñeta solo a elementos de lista
    const content = isListItem ? `• ${text}` : text;
    addText(content, isHeader);
    
    // Agregar espacio adicional después de cada elemento
    addText('', false);
    }); 
    // Guardar PDF
    doc.save(`${fileName}.pdf`);
    
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  }
};