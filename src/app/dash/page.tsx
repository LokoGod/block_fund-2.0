import { FundTable } from "@/components/dash-fundtable";

export default function Dash() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <h1 className="text-4xl text-center mb-2">
      
      </h1>
        <FundTable />
      </div>
    </div>
  )
}
