import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShowtimeSchema } from "@/schema/ShowtimeSchema";
import { ShowtimePayload } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomCombobox } from "@/components/ui/CustomCombobox";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchMovies } from "@/store/slices/movies/movieActions";
import { createShowtime } from "@/store/slices/showtime/showtimeActions";
import { fetchCinemas } from "@/store/slices/cinema/cinemaActions";

export default function ShowtimeForm() {
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShowtimePayload>({
    resolver: zodResolver(ShowtimeSchema),
  });

  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const cinemas = useAppSelector((state) => state.cinemas.cinemas);

  const onSubmit: SubmitHandler<ShowtimePayload> = (data) => {
    data.movieId = selectedMovie;
    data.cinemaId = selectedCinema;
    dispatch(createShowtime(data));
  };

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchCinemas());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-[70%] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create a New Showtime</h1>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="startAt">Start Time</Label>
              <Input id="startAt" {...register("startAt")} />
              {errors.startAt && (
                <p className="text-rose-500">{errors.startAt.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-rose-500">{errors.startDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
              {errors.endDate && (
                <p className="text-rose-500">{errors.endDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="movieId">Movie</Label>
              <CustomCombobox
                options={movies.map((movie) => ({
                  value: movie._id ?? "",
                  label: movie.title,
                }))}
                placeholder="Select a movie..."
                selectedValue={selectedMovie}
                onChange={setSelectedMovie}
              />
              {errors.movieId && (
                <p className="text-rose-500">{errors.movieId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cinemaId">Cinema</Label>
              <CustomCombobox
                options={cinemas.map((cinema) => ({
                  value: cinema._id ?? "",
                  label: cinema.name,
                }))}
                placeholder="Select a cinema..."
                selectedValue={selectedCinema}
                onChange={setSelectedCinema}
              />
              {errors.cinemaId && (
                <p className="text-rose-500">{errors.cinemaId.message}</p>
              )}
            </div>
            <Button className="w-full mt-3" type="submit">
              Create Showtime
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
