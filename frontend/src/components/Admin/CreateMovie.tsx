// src/components/MovieForm.tsx
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieSchema } from "@/schema/MovieSchema";
import { MoviePayload } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { createMovie } from "@/store/slices/movies/movieActions";
import { fetchGenres } from "@/store/slices/genres/genreActions";
import { Combobox } from "./combox";

export default function MovieForm() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MoviePayload>({
        resolver: zodResolver(MovieSchema),
    });

    useEffect(() => {
        dispatch(fetchGenres())

    }, [])

    const dispatch = useAppDispatch();
    const genres = useAppSelector((state) => state.genres.genres);

    console.log(genres, selectedGenres, "selectedGenres");

    const onSubmit: SubmitHandler<MoviePayload> = (data) => {
        console.log(data, "data");
        data.genres = selectedGenres;
        dispatch(createMovie(data));
    };

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    return (
        <div className="flex min-h-screen items-center justify-center w-[screen]">
            <div className="mx-auto w-[screen] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create a New Movie</h1>
                </div>

                <div className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && (
                                <p className="text-rose-500">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" {...register("image")} />
                            {errors.image && (
                                <p className="text-rose-500">{errors.image.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trailer">Trailer URL</Label>
                            <Input id="trailer" {...register("trailer")} />
                            {errors.trailer && (
                                <p className="text-rose-500">{errors.trailer.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Input id="language" {...register("language")} />
                            {errors.language && (
                                <p className="text-rose-500">{errors.language.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="genres">Genres</Label>
                            <Combobox
                                options={genres.map((genre) => ({ value: genre._id, label: genre.name }))}
                                selectedValues={selectedGenres}
                                onSelect={(values) => setSelectedGenres(values)}
                            />
                            {errors.genres && (
                                <p className="text-rose-500">{errors.genres.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="director">Director</Label>
                            <Input id="director" {...register("director")} />
                            {errors.director && (
                                <p className="text-rose-500">{errors.director.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cast">Cast</Label>
                            <Input id="cast" {...register("cast")} />
                            {errors.cast && (
                                <p className="text-rose-500">{errors.cast.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register("description")} />
                            {errors.description && (
                                <p className="text-rose-500">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input id="duration" type="string" {...register("duration")} />
                            {errors.duration && (
                                <p className="text-rose-500">{errors.duration.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="releaseDate">Release Date</Label>
                            <Input
                                id="releaseDate"
                                type="date"
                                {...register("releaseDate")}
                            />
                            {errors.releaseDate && (
                                <p className="text-rose-500">{errors.releaseDate.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input id="endDate" type="date" {...register("endDate")} />
                            {errors.endDate && (
                                <p className="text-rose-500">{errors.endDate.message}</p>
                            )}
                        </div>
                        <Button className="w-full mt-3" type="submit">
                            Create Movie
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
