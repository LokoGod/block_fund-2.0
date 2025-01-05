"use server";

import { prisma } from "@/app/lib/db";

export async function addRecord(formData: FormData) {
  // Extracting data from the FormData object
  const memberId = formData.get("memberId");
  const monthId = formData.get("monthId");
  const donatedAmount = formData.get("amount");

  // Validate the extracted data
  if (!memberId || !monthId || !donatedAmount) {
    throw new Error("All fields are required.");
  }

  // Convert types as necessary
  const memberIdInt = parseInt(memberId.toString(), 10);
  const monthIdInt = parseInt(monthId.toString(), 10);
  const donatedAmountFloat = parseFloat(donatedAmount.toString());

  if (isNaN(memberIdInt) || isNaN(monthIdInt) || isNaN(donatedAmountFloat)) {
    throw new Error("Invalid data types provided.");
  }

  // Create the record in the database
  try {
    await prisma.fundTransaction.create({
      data: {
        memberId: memberIdInt,
        monthId: monthIdInt,
        donated_amount: donatedAmountFloat,
      },
    });
  } catch (error) {
    console.error("Error adding record:", error);
    throw new Error("Failed to add record to the database.");
  }
}
