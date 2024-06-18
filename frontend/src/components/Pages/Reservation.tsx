import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { fetchReservations } from "@/store/slices/reservation/reservationActions";
import dayjs from "dayjs";

const currentDate = new Date();

export default function Reservation() {
  const tickets = useAppSelector((state) => state.reservations.reservations);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchReservations());
  }, []);
  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tickets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.filter((ticket) =>
            dayjs(ticket.showtimeId.startDate).isAfter(currentDate)
          ).length === 0 && <p>No upcoming tickets</p>}
          {tickets
            .filter((ticket) =>
              dayjs(ticket.showtimeId.startDate).isAfter(currentDate)
            )
            .map((ticket) => (
              <Card key={ticket._id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {ticket.showtimeId.movieId.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {dayjs(ticket.showtimeId.startDate).format(
                          "MMMM D, YYYY"
                        )}
                      </p>
                    </div>
                    <Badge variant="default">Confirmed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Time
                      </p>
                      <p>{ticket.showtimeId.startAt}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Venue
                      </p>
                      <p>{ticket.showtimeId.cinemaId.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
        <div className="border shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets
                .filter((ticket) =>
                  dayjs(ticket.showtimeId.startDate).isBefore(currentDate)
                )
                .map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell>{ticket.showtimeId.movieId.title}</TableCell>
                    <TableCell>
                      {dayjs(ticket.showtimeId.startDate).format(
                        "MMMM D, YYYY"
                      )}
                    </TableCell>
                    <TableCell>{ticket.showtimeId.cinemaId.name}</TableCell>
                    <TableCell>{ticket.seats}</TableCell>
                    <TableCell>${ticket.total}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell>Coachella Music Festival</TableCell>
                <TableCell>April 14-16, 2023</TableCell>
                <TableCell>Empire Polo Club</TableCell>
                <TableCell>2</TableCell>
                <TableCell>$500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cirque du Soleil: Luzia</TableCell>
                <TableCell>May 5, 2023</TableCell>
                <TableCell>Dodger Stadium</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$150</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taylor Swift: The Eras Tour</TableCell>
                <TableCell>June 2, 2023</TableCell>
                <TableCell>SoFi Stadium</TableCell>
                <TableCell>4</TableCell>
                <TableCell>$800</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
