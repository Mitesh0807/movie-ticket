import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenreSchema } from "@/schema/GenreSchema"; 
import { GenrePayload } from "@/types"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/store";
import { createGenre } from "@/store/slices/genres/genreActions";

export default function GenreForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GenrePayload>({
        resolver: zodResolver(GenreSchema),
    });

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<GenrePayload> = (data) => {
        dispatch(createGenre(data));
    };

    return (
        <div className="flex min-h-screen items-center justify-center w-[screen]">
            <div className="mx-auto w-[screen] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create a New Genre</h1>
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
                                <p className="text-rose-500">{errors.description.message}</p>
                            )}
                        </div>
                        <Button className="w-full mt-3" type="submit">
                            Create Genre
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}