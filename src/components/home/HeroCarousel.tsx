
import { BannerSlide } from "@/data/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface HeroCarouselProps {
  slides: BannerSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="mb-4">{slide.subtitle}</p>
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                  {slide.ctaText}
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="w-2 h-2 rounded-full bg-white opacity-100" />
        <span className="w-2 h-2 rounded-full bg-white opacity-50" />
        <span className="w-2 h-2 rounded-full bg-white opacity-50" />
      </div>
    </Carousel>
  );
}
