import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CinemaSchema } from "@/schema/CinemaSchema";
import { CinemaPayload } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/store";
import { createCinema } from "@/store/slices/cinema/cinemaActions";

export default function CinemaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CinemaPayload>({
    resolver: zodResolver(CinemaSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<CinemaPayload> = (data) => {
    const { seatsPerRow, seatsPerColumn, ...restData } = data;

    const seats = Array.from({ length: seatsPerRow }, () =>
      Array.from({ length: seatsPerColumn }, () => 0)
    );

    const { ticketPrice, ...restRestData } = restData;
    const payload = {
      ...restRestData,
      ticketPrice: ticketPrice.toString(),
      seats,
      seatsAvailable: seatsPerRow * seatsPerColumn,
      image: restRestData.image || "",
    };

    console.log(payload, "payload");
    dispatch(createCinema(payload));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-[70%] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create a New Cinema</h1>
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
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                id="ticketPrice"
                type="number"
                {...register("ticketPrice")}
              />
              {errors.ticketPrice && (
                <p className="text-rose-500">{errors.ticketPrice.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <p className="text-rose-500">{errors.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seatsPerRow">Seats Per Row</Label>
              <Input
                id="seatsPerRow"
                type="number"
                {...register("seatsPerRow")}
              />
              {errors.seatsPerRow && (
                <p className="text-rose-500">{errors.seatsPerRow.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seatsPerColumn">Seats Per Column</Label>
              <Input
                id="seatsPerColumn"
                type="number"
                {...register("seatsPerColumn")}
              />
              {errors.seatsPerColumn && (
                <p className="text-rose-500">{errors.seatsPerColumn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" {...register("image")} />
              {errors.image && (
                <p className="text-rose-500">{errors.image.message}</p>
              )}
            </div>
            <Button className="w-full mt-3" type="submit">
              Create Cinema
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
