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

export default function Reservation() {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tickets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Coachella Music Festival
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    April 14-16, 2023
                  </p>
                </div>
                <Badge variant="default">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Time
                  </p>
                  <p>7:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Venue
                  </p>
                  <p>Empire Polo Club</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Cirque du Soleil: Luzia
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    May 5, 2023
                  </p>
                </div>
                <Badge variant="default">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Time
                  </p>
                  <p>8:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Venue
                  </p>
                  <p>Dodger Stadium</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Taylor Swift: The Eras Tour
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    June 2, 2023
                  </p>
                </div>
                <Badge variant="default">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Time
                  </p>
                  <p>7:30 PM</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Venue
                  </p>
                  <p>SoFi Stadium</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
