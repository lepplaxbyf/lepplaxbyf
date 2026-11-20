(() => {
  const dialog = document.querySelector(".photo-lightbox");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const lightboxImage = dialog.querySelector(".photo-lightbox-image");
  const lightboxVideo = dialog.querySelector(".photo-lightbox-video");
  const closeButton = dialog.querySelector(".photo-lightbox-close");
  const prevButton = dialog.querySelector(".photo-lightbox-prev");
  const nextButton = dialog.querySelector(".photo-lightbox-next");
  if (!(lightboxImage instanceof HTMLImageElement) || !(closeButton instanceof HTMLButtonElement)) return;
  const videoAutoplay = dialog.dataset.videoAutoplay === "true";

  // Collect all media items (both images and videos) in order
  const mediaItems = [];
  document.querySelectorAll(".photo-card").forEach((card, cardIndex) => {
    const img = card.querySelector("img");
    const video = card.querySelector("video");
    
    if (img) {
      const fullSizeImage = card.querySelector(".photo-open")?.dataset.mediaSrc;
      mediaItems.push({
        type: "image",
        src: fullSizeImage || img.currentSrc || img.src,
        alt: img.alt,
        cardIndex: cardIndex,
      });
    } else if (video) {
      mediaItems.push({
        type: "video",
        src: video.src,
        alt: video.alt || "Video",
        cardIndex: cardIndex,
      });
    }
  });

  let current = 0;

  const show = (index) => {
    current = (index + mediaItems.length) % mediaItems.length;
    const item = mediaItems[current];
    lightboxVideo.pause();

    if (item.type === "image") {
      lightboxImage.style.display = "block";
      lightboxVideo.style.display = "none";
      lightboxVideo.removeAttribute("src");
      lightboxImage.src = item.src;
      lightboxImage.alt = item.alt;
    } else if (item.type === "video") {
      lightboxImage.style.display = "none";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = item.src;
      if (videoAutoplay) lightboxVideo.play();
    }
  };

  document.querySelectorAll(".photo-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Find which media item this button corresponds to
      const card = btn.closest(".photo-card");
      const cardIndex = Array.from(document.querySelectorAll(".photo-card")).indexOf(card);
      const mediaIndex = mediaItems.findIndex((item) => item.cardIndex === cardIndex);
      show(mediaIndex);
      dialog.showModal();
    });
  });

  document.querySelectorAll(".gallery-video").forEach((video) => {
    video.addEventListener("click", () => {
      // Find which media item this video corresponds to
      const card = video.closest(".photo-card");
      const cardIndex = Array.from(document.querySelectorAll(".photo-card")).indexOf(card);
      const mediaIndex = mediaItems.findIndex((item) => item.cardIndex === cardIndex);
      show(mediaIndex);
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
  dialog.addEventListener("close", () => {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
  });
  
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
})();
