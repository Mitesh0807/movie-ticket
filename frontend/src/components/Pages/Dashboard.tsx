import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { SVGProps, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchMovies } from "@/store/slices/movies/movieActions";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";

export default function Component() {

  const movies = useAppSelector((state) => state.movies.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies())
    return () => {};
  }, []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Carousel className="rounded-xl">
            <CarouselContent>
              {movies &&
                movies.length &&
                movies.map((movie) => (
                  <CarouselItem key={movie._id}>
                    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl">
                      <img
                        src={movie.image}
                        width="1600"
                        height="900"
                        alt="Movie Poster"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                          {movie.title}
                        </h2>
                        <p className="text-gray-300 mt-2 sm:text-lg md:text-xl lg:text-2xl">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 rounded-full p-2 text-gray-50 transition-colors">
              <ChevronLeftIcon className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 rounded-full p-2 text-gray-50 transition-colors">
              <ChevronRightIcon className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Movies
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the latest and greatest movies coming soon to a
                theater near you.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {movies &&
              movies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden"
                >
                  <img
                    src={movie.image}
                    width="400"
                    height="600"
                    alt="Movie Poster"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{movie?.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{movie.releaseDate?.toString()}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">Buy Tickets</Button>
                      <Button variant="outline" className="flex-1">
                        Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
