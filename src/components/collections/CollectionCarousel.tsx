
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface CollectionCarouselProps {
  images: string[];
  collectionId: string;
}

const CollectionCarousel = ({ images, collectionId }: CollectionCarouselProps) => {
  // If no images, return early
  if (!images || images.length === 0) {
    return (
      <div className="bg-muted h-32 rounded-md flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No preview available</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: images.length > 3,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 basis-1/2">
            <div className="p-1">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={image}
                  alt={`Collection item ${index + 1}`}
                  className="rounded-md object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-1 mt-2">
        <CarouselPrevious className="relative static left-0 right-auto translate-y-0 h-8 w-8" />
        <CarouselNext className="relative static right-0 translate-y-0 h-8 w-8" />
      </div>
    </Carousel>
  );
};

export default CollectionCarousel;
