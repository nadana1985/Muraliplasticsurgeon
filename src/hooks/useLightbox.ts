import { useState } from "react";

interface LightboxImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);

  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return { isOpen, currentIndex, open, close, next, prev };
}
