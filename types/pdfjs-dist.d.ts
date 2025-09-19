declare module 'pdfjs-dist/build/pdf.mjs' {
  import * as pdfjsLib from 'pdfjs-dist';
  export = pdfjsLib;
}

declare module 'pdfjs-dist/build/pdf.worker.mjs' {
  class PDFWorker {
    constructor(options?: { port?: any });
  }
  export { PDFWorker };
}
