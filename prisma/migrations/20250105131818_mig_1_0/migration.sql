-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Months" (
    "id" SERIAL NOT NULL,
    "month_title" TEXT NOT NULL,

    CONSTRAINT "Months_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundTransaction" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "monthId" INTEGER NOT NULL,
    "donated_amount" DOUBLE PRECISION NOT NULL,
    "donated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FundTransaction" ADD CONSTRAINT "FundTransaction_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundTransaction" ADD CONSTRAINT "FundTransaction_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Months"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
