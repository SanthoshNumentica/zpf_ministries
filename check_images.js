import { Jimp } from 'jimp';

async function check() {
  const images = [
    'apps/frontend/public/assets/img/daughter_family_1.jpg',
    'apps/frontend/public/assets/img/daughter_family_2.jpg',
    'apps/frontend/public/assets/img/muhil_family.png',
    'apps/frontend/public/assets/img/dhas_church.png',
    'apps/frontend/public/assets/img/dhas_outside.png'
  ];
  for (const imgPath of images) {
    try {
      const img = await Jimp.read(imgPath);
      console.log(imgPath, ':', img.width, 'x', img.height);
    } catch (err) {
      console.error('Error reading', imgPath, err.message);
    }
  }
}

check();
