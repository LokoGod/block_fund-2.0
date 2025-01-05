import { prisma } from "@/app/lib/db";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  export async function FundTable() {

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

      // Query to fetch records for the current month and year
    const records = await prisma.fundTransaction.findMany({
      where: {
          month: {
              month_title: month.toString(), // Assuming `month_title` stores month number as string (e.g., "1" for January)
          },
          monthId: {
              in: await prisma.months.findMany({
                  where: {
                      month_title: month.toString(),
                  },
                  select: { id: true },
              }).then((months) => months.map((month) => month.id)),
          },
      },
      include: {
          member: true,
      },
  });

  // Calculate the total donation amount for the current month
  const recordTotal = records.reduce((total, record) => total + record.donated_amount, 0);

    
    return (
      <Table>
      <TableCaption>A list of the recent donations.<a href="previousDonations" className="underline underline-offset-1">view previous</a>.</TableCaption>
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
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">Rs {recordTotal}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    )
  }
  