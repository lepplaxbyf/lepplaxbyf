(() => {
  const dialog = document.querySelector(".photo-lightbox");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const lightboxImage = dialog.querySelector(".photo-lightbox-image");
  const closeButton = dialog.querySelector(".photo-lightbox-close");
  const prevButton = dialog.querySelector(".photo-lightbox-prev");
  const nextButton = dialog.querySelector(".photo-lightbox-next");
  if (!(lightboxImage instanceof HTMLImageElement) || !(closeButton instanceof HTMLButtonElement)) return;

  const images = Array.from(document.querySelectorAll(".photo-open img")).filter(
    (image) => image instanceof HTMLImageElement,
  );
  let current = 0;

  const show = (index) => {
    current = (index + images.length) % images.length;
    const image = images[current];
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
  };

  images.forEach((image, index) => {
    image.closest(".photo-open").addEventListener("click", () => {
      show(index);
      dialog.showModal();
    });
  });

  prevButton?.addEventListener("click", () => show(current - 1));
  nextButton?.addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    else if (event.key === "ArrowRight") show(current + 1);
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
