import { fetchShowtimeById } from "@/store/slices/showtime/showtimeActions";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createReservation } from "@/store/slices/reservation/reservationActions";

export default function SeatSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showTime = useAppSelector((state) => state.showtime.selectedShowtime);
  const { id } = useParams<{ id: string }>();
  const [selectedSeats, setSelectedSeats] = useState<number[][]>([]);
  const [seatsGrid, setSeatsGrid] = useState<number[][]>([]);

  useEffect(() => {
    if (id) dispatch(fetchShowtimeById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (showTime) {
      setSeatsGrid(structuredClone(showTime.seats));
    }
  }, [showTime]);

  const handleSeatClick = (row: number, col: number) => {
    const updatedGrid = [...seatsGrid];
    updatedGrid[row][col] = updatedGrid[row][col] === 0 ? 2 : 0;
    setSeatsGrid(updatedGrid);

    const seatIndex = selectedSeats.findIndex(
      (seat) => seat[0] === row && seat[1] === col
    );

    if (seatIndex > -1) {
      setSelectedSeats((prev) =>
        prev.filter((seat, index) => index !== seatIndex)
      );
    } else {
      setSelectedSeats((prev) => [...prev, [row, col]]);
    }
  };

  const handleConfirmClick = () => {
    if (!showTime) return;
    const payload = {
      showtimeId: showTime._id,
      seats: seatsGrid.map((row) => row.map((seat) => (seat === 2 ? 1 : seat))),
      seatsSelected: selectedSeats,
      total: showTime.cinemaId.ticketPrice * selectedSeats.length,
      ticketPrice: showTime.cinemaId.ticketPrice,
      startAt: showTime.startAt,
    };

    //TODO: Add error handling and typings

    dispatch(createReservation(payload))
      .unwrap()
      .then(() => navigate("/reservations"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showTime && (
        <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">{showTime.movieId.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {showTime.cinemaId.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {showTime.startAt}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {seatsGrid.map((row, rowIndex) =>
              row.map((seat, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    seat === 1
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : seat === 0
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  {seat === 1 ? "X" : ""}
                </div>
              ))
            )}
          </div>
          <div className="mt-6 text-center">
            <Button variant="default" onClick={handleConfirmClick}>
              Confirm Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
