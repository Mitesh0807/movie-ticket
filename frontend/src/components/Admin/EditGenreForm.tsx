import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenreSchema } from "@/schema/GenreSchema";
import { GenrePayload } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateGenre, fetchGenres } from "@/store/slices/genres/genreActions";
import { useParams } from "react-router-dom";

export default function EditGenre() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GenrePayload>({
        resolver: zodResolver(GenreSchema),
    });

    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const genre = useAppSelector((state) => state.genres.genres.find((g) => g._id === id));

    useEffect(() => {
        if (id) {
            dispatch(fetchGenres());
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (genre) {
            reset(genre);
        }
    }, [genre, reset]);

    const onSubmit: SubmitHandler<GenrePayload> = (data) => {
        if(!id)return
        dispatch(updateGenre({...data,_id:id  }));
    };

    if (!genre) {
        return <div>Loading...</div>;
    }

      return (
        <div className="flex min-h-screen items-center justify-center w-[screen]">
          <div className="mx-auto w-[screen] space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Edit Genre</h1>
            </div>

            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-rose-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" {...register("description")} />
                  {errors.description && (
                    <p className="text-rose-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <Button className="w-full mt-3" type="submit">
                  Update Genre
                </Button>
              </form>
            </div>
          </div>
        </div>
      );
}