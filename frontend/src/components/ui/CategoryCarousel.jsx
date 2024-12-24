import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "./button";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  return (
    <>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((category) => {
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <Button>{category}</Button>
            </CarouselItem>;
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default CategoryCarousel;
