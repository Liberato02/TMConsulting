import { useState } from "react";

interface VideoYoutubeProps {
  idVideo: string;
  titulo: string;
}

export function VideoYoutube({ idVideo, titulo }: VideoYoutubeProps) {
  const [tocando, setTocando] = useState(false);

  if (tocando) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${idVideo}?autoplay=1`}
        title={titulo}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTocando(true)}
      aria-label={`Reproduzir vídeo: ${titulo}`}
      className="relative w-full h-full group cursor-pointer"
    >
      <img
        src={`https://i.ytimg.com/vi/${idVideo}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-2xl text-white shadow-lg transition group-hover:scale-110">
          ▶
        </span>
      </span>
    </button>
  );
}