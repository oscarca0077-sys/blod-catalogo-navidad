const gallery = document.getElementById('gallery');
const galleryOther = document.getElementById('gallery-other');
const dialog = document.getElementById('product-dialog');
const dialogPhoto = document.getElementById('dialog-photo');
const dialogIndex = document.getElementById('dialog-index');
const dialogTitle = document.getElementById('dialog-title');
const dialogMaterial = document.getElementById('dialog-material');
const dialogWhatsapp = document.getElementById('dialog-whatsapp');
const restoredPhotos = new Set([1, 3, 4, 5, 16]);

const photoNumbers = [...Array.from({ length: 21 }, (_, index) => index + 1), 24];
const photoItems = photoNumbers.map((photoNumber, index) => ({
  viewNumber: index + 1,
  photoNumber,
  src: `assets/photo-${String(photoNumber).padStart(2, '0')}-${restoredPhotos.has(photoNumber) ? 'restaurada.svg' : 'christmas.webp'}`,
  familyOf: null,
}));
photoItems.push({
  viewNumber: 23,
  photoNumber: 17,
  src: 'assets/photo-17-family.webp',
  familyOf: 17,
});
photoItems.sort((first, second) => {
  const firstGroup = first.viewNumber >= 17 ? 0 : 1;
  const secondGroup = second.viewNumber >= 17 ? 0 : 1;
  return firstGroup - secondGroup || first.viewNumber - second.viewNumber;
});

const otherItems = otherAlbumNumbers.map((albumNumber, index) => ({
  viewNumber: photoItems.length + index + 1,
  photoNumber: albumNumber,
  src: `assets/album2-${String(albumNumber).padStart(2, '0')}-christmas.webp`,
  category: 'Otros Modelos',
}));
const totalViews = photoItems.length + otherItems.length + 4;

function addCard({ viewNumber, photoNumber, src: photoSrc, familyOf, category }, target) {
  const number = String(viewNumber).padStart(2, '0');
  const isOther = category === 'Otros Modelos';
  const isAddition = !isOther && photoNumber > 16;
  const description = isOther ? 'de Otros Modelos' : `de pijama navideña${familyOf ? ' en familia' : ''}`;
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'product';
  card.setAttribute('aria-label', `Abrir vista ${number} ${description}`);
  card.innerHTML = `<img src="${photoSrc}" alt="Vista ${number} ${description}" loading="lazy"><span class="product-line"><strong>Vista ${number}</strong><span>Ver diseño ↗</span></span>`;
  card.addEventListener('click', () => {
    dialogPhoto.src = photoSrc;
    dialogPhoto.alt = `Vista ${number} ${description}`;
    dialogIndex.textContent = `VISTA ${number} / ${totalViews}`;
    dialogTitle.textContent = isOther ? 'Otros Modelos' : (isAddition ? 'Navideñas' : 'Pijama navideña');
    dialogMaterial.textContent = isOther || isAddition ? 'Material por confirmar' : 'Piel de durazno';
    const whatsappText = `Hola, quiero consultar la pijama de la vista ${number} del catálogo blod.`;
    dialogWhatsapp.href = `https://api.whatsapp.com/send/?phone=573002149399&text=${encodeURIComponent(whatsappText)}`;
    dialog.showModal();
  });
  target.append(card);
}

photoItems.forEach((item, index) => addCard({ ...item, viewNumber: index + 1 }, gallery));
otherItems.forEach(item => addCard(item, galleryOther));

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const betplayItems=[['assets/betplay-163.png','Nacional'],['assets/betplay-164.png','Santa Fe'],['assets/betplay-165.png','Millonarios'],['assets/betplay-166.png','Millonarios']];
betplayItems.forEach(([src,name],index)=>{
 const view=163+index;
 const card=document.createElement('button');card.className='product';card.type='button';card.setAttribute('aria-label',`Abrir vista ${view}, ${name}`);
 card.innerHTML=`<img src="${src}" alt="Pijama ${name}, vista ${view}" loading="lazy"><span class="product-line"><strong>Vista ${view}</strong><span>Ver diseño ↗</span></span>`;
 card.addEventListener('click',()=>{dialogPhoto.src=src;dialogPhoto.alt=name;dialogIndex.textContent=`VISTA ${view} / 166`;dialogTitle.textContent=name;dialogMaterial.textContent='';dialogWhatsapp.href='https://api.whatsapp.com/send/?phone=573002149399&text='+encodeURIComponent(`Hola, quiero consultar la pijama de la vista ${view} del catálogo blod Betplay 2026.`);dialog.showModal()});
 document.getElementById('gallery-betplay').append(card);
});
