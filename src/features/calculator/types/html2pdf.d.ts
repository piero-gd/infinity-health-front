declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | number[];
      filename?: string;
      image?: { type?: string; quality?: number };
      html2canvas?: any;
      jsPDF?: any;
      pagebreak?: { mode?: string[]; before?: string; after?: string };
    }
  
    interface Html2PdfInstance {
      set(options: Html2PdfOptions): Html2PdfInstance;
      from(element: HTMLElement): Html2PdfInstance;
      save(): Promise<void>;
    }
  
    const html2pdf: {
      (): Html2PdfInstance;
      create: () => Html2PdfInstance;
    };
    
    export = html2pdf;
  }