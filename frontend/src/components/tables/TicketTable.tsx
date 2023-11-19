import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TicketTable({ tickets }: any) {
  return (
    <div className="mx-4 mb-8">
      <Table className="rounded-xl border">
        <TableHeader className="">
          <TableRow className="bg-muted/50">
            <TableHead className="w-[125px]">Course ID</TableHead>
            <TableHead className="">Ticket Title</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {tickets.map((ticket: any) => (
          <TableBody>
            <TableRow key="tablerow" className="h-3">
              <TableCell className="p-2 font-medium">{ticket.course}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell className="text-right pr-2">{ticket.status}</TableCell>
            </TableRow>
          </TableBody>
        ))}
        <TableCaption>YUP!</TableCaption>
      </Table>
    </div>
  );
}
