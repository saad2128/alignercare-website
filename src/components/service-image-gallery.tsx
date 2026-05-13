"use client";

import Image from "next/image";
import { useState } from "react";

type ServiceImageGalleryProps = {
  name: string;
  images: string[];
};

export function ServiceImageGallery({ name, images }: ServiceImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] ?? "");

  if (!images.length) {
    return null;
  }

  return (
    <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_180px]">
      <div className="relative h-72 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-96">
        <Image
          src={activeImage}
          alt={`${name} preview`}
          fill
          className="object-cover"
          quality={95}
          sizes="(max-width: 1024px) 100vw, 75vw"
        />
      </div>

      <div className="grid grid-cols-5 gap-2 lg:grid-cols-1">
        {images.map((image, index) => {
          const isActive = image === activeImage;
          return (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`relative h-16 overflow-hidden rounded-lg border sm:h-20 lg:h-[72px] ${
                isActive ? "border-cyan-600 ring-2 ring-cyan-200" : "border-slate-200"
              }`}
              aria-label={`Show ${name} image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                quality={85}
                sizes="160px"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
