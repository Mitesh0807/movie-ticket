import { Button } from "@/components/ui/button";
import { fetchShowtimesByCinemaId } from "@/store/slices/showtime/showtimeActions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Showtime() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const showtimes = useAppSelector((state) => state.showtime.showtimes);

  useEffect(() => {
    if (id) dispatch(fetchShowtimesByCinemaId(id));
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Showtimes</h1>
      <div className="grid gap-8">
        {showtimes.map((showtime) => (
          <div
            key={showtime._id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold mb-4">{showtime.cinemaId.name}</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div>
                  <h3 className="font-semibold">{showtime.movieId.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {showtime.startAt}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Link to={`/seat-selection/${showtime._id}`}>
                    Buy Tickets
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
