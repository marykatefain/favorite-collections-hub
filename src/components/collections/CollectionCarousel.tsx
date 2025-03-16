
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        containScroll: "trimSnaps",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 -mr-2">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-2 md:basis-1/3 lg:basis-1/4 basis-1/2">
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
    </Carousel>
  );
};

export default CollectionCarousel;
