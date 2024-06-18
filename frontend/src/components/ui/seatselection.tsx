import { fetchShowtimeById } from "@/store/slices/showtime/showtimeActions";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SeatSelection() {
  const dispatch = useDispatch();
  const showTime = useAppSelector((state) => state.showtime.selectedShowtime);
  const { id } = useParams<{ id: string }>();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [seatsGrid, setSeatsGrid] = useState<number[][]>([]);
  console.log(showTime);
  useEffect(() => {
    dispatch(fetchShowtimeById("6671db2852e29ce6b928f5fc"));
  }, [id, dispatch]);

  useEffect(() => {
    if (showTime) {
      setSeatsGrid(structuredClone(showTime.seats));
    }
  }, [showTime, id]);

  const handleSeatClick = (row, col) => {
    console.log(row, col);
    const updatedGrid = [...seatsGrid];
    updatedGrid[row][col] = updatedGrid[row][col] === 0 ? 2 : 0;
    setSeatsGrid(updatedGrid);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-7 gap-2">
          {seatsGrid &&
            seatsGrid.length > 0 &&
            seatsGrid.map((row, rowIndex) =>
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
      </div>
    </div>
  );
}
