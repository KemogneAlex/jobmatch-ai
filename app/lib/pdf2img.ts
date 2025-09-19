export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  // Importer la version ES modules de pdf.js
  loadPromise = import('pdfjs-dist/build/pdf.mjs').then(async (pdfjsLibModule) => {
    // Créer une URL pour le worker
    const workerUrl = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url);
    
    // Configurer le worker avec l'URL
    pdfjsLibModule.GlobalWorkerOptions.workerSrc = workerUrl.toString();
    
    pdfjsLib = pdfjsLibModule;
    isLoading = false;
    return pdfjsLib;
  });

  return loadPromise;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  console.log('Début de la conversion du PDF en image...');
  console.log('Nom du fichier:', file.name);
  console.log('Taille du fichier:', file.size, 'bytes');
  console.log('Type MIME:', file.type);

  try {
    console.log('Chargement de pdf.js...');
    const lib = await loadPdfJs();
    console.log('pdf.js chargé avec succès');

    console.log('Conversion du fichier en ArrayBuffer...');
    const arrayBuffer = await file.arrayBuffer();
    console.log('Taille du ArrayBuffer:', arrayBuffer.byteLength, 'bytes');

    console.log('Chargement du document PDF...');
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log(`PDF chargé: ${pdf.numPages} page(s) trouvée(s)`);

    const page = await pdf.getPage(1);
    console.log('Page 1 chargée');

    const viewport = page.getViewport({ scale: 4 });
    console.log('Viewport créé:', { width: viewport.width, height: viewport.height });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    console.log('Contexte 2D du canvas:', context ? 'OK' : 'ÉCHEC');

    if (!context) {
      throw new Error('Impossible d\'obtenir le contexte 2D du canvas');
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    console.log('Dimensions du canvas:', { width: canvas.width, height: canvas.height });

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    console.log('Début du rendu de la page...');
    await page.render({ canvasContext: context, viewport }).promise;
    console.log('Rendu de la page terminé');

    return new Promise((resolve) => {
      console.log('Conversion du canvas en blob...');
      canvas.toBlob(
        (blob) => {
          console.log('Callback toBlob appelé, blob:', blob ? `type: ${blob.type}, size: ${blob.size} bytes` : 'null');

          if (blob) {
            const originalName = file.name.replace(/\.pdf$/i, '');
            const imageFile = new File([blob], `${originalName}.png`, {
              type: 'image/png',
            });

            console.log('Fichier image créé avec succès');
            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            console.error('Échec de la création du blob: le blob est null');
            resolve({
              imageUrl: '',
              file: null,
              error: 'Échec de la création du blob image',
            });
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (err) {
    console.error('Erreur lors de la conversion du PDF en image:', err);
    return {
      imageUrl: '',
      file: null,
      error: `Échec de la conversion du PDF : ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
