
import { Cache } from './cache';
import { dataURItoBlob } from './file';


export function getImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  const img = document.createElement('img');

  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    img.onload = (ev) => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = reject;

    img.src = url;
  });
}

export async function getDataUrlBySrc(src: string) {
  return new Promise<string>((resolve, reject) => {
    if (Cache.localGet('isIE')) {
      const xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open('GET', src, true);

      xmlHTTP.responseType = 'arraybuffer';
      xmlHTTP.setRequestHeader('Cache-Control', 'no-cache');
      xmlHTTP.setRequestHeader('Pragma', 'no-cache');
      xmlHTTP.setRequestHeader('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

      xmlHTTP.onload = function (e) {
        const arr = new Uint8Array(xmlHTTP.response);
        const raw = Array.prototype.map
          .call(arr, (charCode:any) => String.fromCharCode(charCode))
          .join('');
        const b64 = btoa(raw);
        const dataURL = 'data:image/jpeg;base64,' + b64;
        resolve(dataURL);
      };
      xmlHTTP.onerror = function (err) {
        reject(err);
      };
      xmlHTTP.send();
    } else {
      resolve(src);
    }
  });
}

export async function rotateImage(image: string, deg: number, quality: number = 1) {
  const size = await getImageSize(image);
  return new Promise<string>((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size.height;
    canvas.height = size.width;

    const context = canvas.getContext('2d') as any;
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(deg / 180 * Math.PI);

    const imageElement = document.createElement('img');
    imageElement.crossOrigin = 'Anonymous';
    imageElement.onload = () => {
      context.drawImage(imageElement, -size.width / 2, -size.height / 2);

      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    imageElement.onerror = err => reject(err);
    getDataUrlBySrc(image).then(b64 => (imageElement.src = b64));
  });
}

export async function doCompressImage(
  imageUrl: string,
  outputType = 'image/jpeg',
  quality = 0.92,
) {
  return new Promise<string>((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const imageSize = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };

      const scaleX = Math.min(4096 / imageSize.width, 1);
      const scaleY = Math.min(4096 / imageSize.height, 1);

      const scale = Math.min(scaleX, scaleY);

      const canvas = document.createElement('canvas') as any;
      canvas.width = imageSize.width * scale;
      canvas.height = imageSize.height * scale;

      const context = canvas.getContext('2d');
      context.drawImage(
        img,
        0,
        0,
        imageSize.width,
        imageSize.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      resolve(canvas.toDataURL(outputType, quality));
    };

    img.onerror = reject;

    getDataUrlBySrc(imageUrl).then(b64 => (img.src = b64));
  });
}

export async function compressImageIfLarge(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const size = await getImageSize(objectUrl);
    if (
      size.width > 4096 ||
      size.height > 4096 ||
      file.size > 8 * 1024 * 1024
    ) {
      const dataUrl = await doCompressImage(objectUrl);
      const filename = file.name.split('.')[0] + '.jpeg';
      // return new File([dataURItoBlob(dataUrl)], filename, {
      //   type: 'image/jpeg'
      // });
      return dataURItoBlob(dataUrl);
    } else {
      return file;
    }
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}