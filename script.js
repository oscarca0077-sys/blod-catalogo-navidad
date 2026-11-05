const gallery = document.getElementById('gallery');
const dialog = document.getElementById('product-dialog');
const dialogPhoto = document.getElementById('dialog-photo');
const dialogIndex = document.getElementById('dialog-index');
const dialogWhatsapp = document.getElementById('dialog-whatsapp');

for (let n = 1; n <= 16; n++) {
  const number = String(n).padStart(2, '0');
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'product';
  card.setAttribute('aria-label', `Abrir vista ${number} de la colección`);
  card.innerHTML = `<img src="assets/photo-${number}.jpg" alt="Vista ${number} de pijama navideña" loading="lazy"><span class="product-line"><strong>Vista ${number}</strong><span>Ver diseño ↗</span></span>`;
  card.addEventListener('click', () => {
    dialogPhoto.src = `assets/photo-${number}.jpg`;
    dialogPhoto.alt = `Vista ${number} de pijama navideña`;
    dialogIndex.textContent = `VISTA ${number} / 16`;
    dialogWhatsapp.href = `https://api.whatsapp.com/send/?phone=573002149399&text=${encodeURIComponent(`Hola, quiero consultar la pijama de la vista ${number} del catálogo blod.`)}`;
    dialog.showModal();
  });
  gallery.append(card);
}

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
