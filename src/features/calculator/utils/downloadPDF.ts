// Tipos para jsPDF
declare global {
  interface Window {
    jspdf: typeof import('jspdf');
  }
}

// Importa el logo como URL utilizando Vite
import healthLogoLightMode from '/public/img/health-logo-light-mode.png';

// Función para precargar una imagen y convertirla a base64
const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Importante para evitar errores CORS
    
    img.onload = () => {
      try {
        // Crear un canvas para convertir la imagen a base64
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Dibujar la imagen en el canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Convertir a base64
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (e) {
        console.error('[PDF] Error al convertir imagen a base64:', e);
        reject(e);
      }
    };
    
    img.onerror = (e) => {
      console.error('[PDF] Error al cargar la imagen:', e);
      reject(new Error(`No se pudo cargar la imagen: ${url}`));
    };
    
    img.src = url;
  });
};

export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  console.log('[PDF] Iniciando generación de PDF');
  try {
    if (!element) {
      console.error('[PDF] Error: No se proporcionó ningún elemento');
      throw new Error('No se proporcionó ningún elemento');
    }
    
    // Precargar la imagen del logo para evitar problemas
    let logoDataUrl: string;
    try {
      logoDataUrl = await loadImageAsBase64(healthLogoLightMode);
    } catch (error) {
      console.error('[PDF] Error al precargar el logo:', error);
      // Si falla la carga, usaremos un placeholder vacío
      logoDataUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Imagen transparente
    }
    
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
    try {
      // Usar la versión precargada del logo en base64
      doc.addImage(logoDataUrl, 'PNG', pageWidth - margin - 40, margin + 10, 40, 13);
    } catch (error) {
      console.error('[PDF] Error al agregar logo:', error);
    }
    
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
    element.querySelectorAll('.border-gray-200').forEach((meal) => {
      // Obtener el nombre de la comida y las calorías
      const mealHeader = meal.querySelector('.bg-gray-50');
      if (mealHeader) {
        const mealName = mealHeader.querySelector('h3')?.textContent?.trim() || '';
        const mealCalories = mealHeader.querySelector('.bg-yellow-100')?.textContent?.trim() || '';
        
        // Agregar espacio antes de cada comida (excepto la primera)
        if (y > 30) {
          y += 5; // Reduje el espacio entre comidas
        }
        
        // Agregar nombre de la comida en color y negrita
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(23, 152, 224); // Color azul
        doc.text(mealName, pageWidth / 2, y, { align: 'center' });
        y += 8;
        
        // Agregar calorías centradas debajo del título
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100); // Gris oscuro
        const caloriesText = mealCalories;
        const caloriesWidth = doc.getStringUnitWidth(caloriesText) * doc.getFontSize() / doc.internal.scaleFactor;
        doc.text(caloriesText, (pageWidth - caloriesWidth) / 2, y);
        y += 10;
      }
      
      // Restaurar color por defecto
      doc.setTextColor(0, 0, 0);
      
      // Procesar los items de la comida
      const items = meal.querySelectorAll('.divide-y > .px-4.py-3');
      
      items.forEach((item) => {
        const foodElement = item.querySelector('.text-gray-800');
        const quantityElement = item.querySelector('.text-gray-500');
        const caloriesElement = item.querySelector('.text-gray-700');
        
        // Verificar que sea un ítem de comida y no un título
        if (foodElement && quantityElement && caloriesElement && !foodElement.closest('.bg-gray-50')) {
          const food = foodElement.textContent?.trim() || '';
          const quantity = quantityElement.textContent?.trim() || '';
          // Obtener solo el valor numérico de las calorías (sin 'kcal')
          const caloriesValue = caloriesElement.textContent?.trim().replace(' kcal', '') || '';
          const calories = caloriesValue ? `${caloriesValue} kcal` : '';
          
          // Asegurar que haya espacio suficiente para la siguiente línea
          if (y > 270) { // Aumenté el límite para aprovechar mejor el espacio
            doc.addPage();
            y = 20;
          }
          
          // Agregar viñeta y nombre del alimento
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0); // Negro para el texto normal
          
          // Calcular el ancho del texto para manejar saltos de línea
          const bullet = '• ';
          const foodText = `${bullet}${food}`;
          const foodLines = doc.splitTextToSize(foodText, pageWidth - (margin * 2) - 30);
          
          // Imprimir cada línea del alimento
          foodLines.forEach((line: string) => {
            if (y > 270) { // Aumenté el límite para aprovechar mejor el espacio
              doc.addPage();
              y = 20;
            }
            doc.text(line, margin, y);
            y += 4; // Reduje el espaciado entre líneas
          });
          
          // Agregar cantidad y calorías en la misma línea
          const itemInfo = `${quantity} ${calories}`;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(58, 176, 249); // Color azul para la información nutricional
          doc.text(itemInfo, pageWidth - margin, y - 5, { align: 'right' });
          
          y += 7; // Reduje el espacio después del ítem
        }
      });
      
      // Agregar espacio entre comidas
      addText('');
    });

    // --- PIE DE PÁGINA ---
    // Añadir línea decorativa
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    // Agregar logo de Infinity Health
    try {
      const logoWidth = 80;
      const logoHeight = 25;
      const logoX = (pageWidth - logoWidth) / 2; // Centrar el logo
      // Usar la versión precargada del logo en base64
      doc.addImage(
        logoDataUrl,
        'PNG',
        logoX,
        y,
        logoWidth,
        logoHeight
      );
      y += logoHeight + 10;
    } catch (e) {
      console.error('[PDF] Error al cargar el logo en el pie de página:', e);
    }
    
    // Texto de descargo de responsabilidad
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120); // Gris un poco más oscuro
    
    const disclaimer = 'Este es un plan referencial generado por Infinity Health. Para una atención personalizada, te recomendamos consultar con tu nutricionista o médico de cabecera.';
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
    
    // Calcular posición Y para centrar verticalmente
    const disclaimerHeight = disclaimerLines.length * 4; // Altura aproximada del texto
    const startY = y + ((270 - y - disclaimerHeight) / 2);
    
    doc.text(disclaimerLines, pageWidth / 2, startY, { align: 'center' });
    
    // Añadir información de copyright
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`© ${new Date().getFullYear()} Infinity Health - Todos los derechos reservados`, pageWidth / 2, 285, { align: 'center' });

    // Guardar PDF
    doc.save(`${fileName}.pdf`);
    console.log('[PDF] PDF generado correctamente');
    
  } catch (error) {
    console.error('[PDF] Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  }
};