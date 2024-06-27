/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MCkiAdLimhs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function Leaderx() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Leaderboard</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Employees with the longest tenure at the company.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-6 py-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead className="text-right">Years Worked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell className="font-medium">Ahmed Tamer</TableCell>
                <TableCell>Software Engineer</TableCell>
                <TableCell className="text-right">9</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2</TableCell>
                <TableCell className="font-medium">You!</TableCell>
                <TableCell>Software Enginner</TableCell>
                <TableCell className="text-right">6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3</TableCell>
                <TableCell className="font-medium">Michael aleksandrov</TableCell>
                <TableCell>Back-end developer</TableCell>
                <TableCell className="text-right">7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">4</TableCell>
                <TableCell className="font-medium">Emily Brown</TableCell>
                <TableCell>IT Support Specialist</TableCell>
                <TableCell className="text-right">8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5</TableCell>
                <TableCell className="font-medium">Jo Ashraf</TableCell>
                <TableCell>Software Engineer</TableCell>
                <TableCell className="text-right">3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}