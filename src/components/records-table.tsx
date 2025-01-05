import { prisma } from "@/app/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function RecordsTable() {
  // const date = new Date();
  // const month = date.toLocaleString("default", { month: "long" });
  // const year = date.getFullYear();

  const records = await prisma.fundTransaction.findMany({ include: {
    member: true,
  }});

  return (
    <Table>
      <TableCaption>A list of the recent donations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Donation ID</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.id}</TableCell>
            <TableCell>{record.member.name}</TableCell>
            <TableCell>{record.donated_date.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              Rs {record.donated_amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
