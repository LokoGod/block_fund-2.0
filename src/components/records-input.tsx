import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/app/lib/db";
import { addRecord } from "@/actions/actions";

export async function RecordsInput() {
  const members = await prisma.members.findMany();
  const months = await prisma.months.findMany();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add a record</CardTitle>
        <CardDescription>
          Put in the details of the latest donation.
        </CardDescription>
      </CardHeader>
      <form action={addRecord}>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Member</Label>
              <Select name="memberId">
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Month</Label>
             <Select name="monthId">
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {months.map((month) => (
                    <SelectItem key={month.id} value={month.id.toString()}>
                      {month.month_title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input type="number" id="amount" name="amount" placeholder="Rs." />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button type="submit">Publish</Button>
      </CardFooter>
      </form>

    </Card>
  );
}
