import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogType } from "@/utils/interface";

interface ContentType {
  logs: LogType[];
}

const Content = ({ logs }: ContentType) => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/5 min-w-[90px] text-center">
            passing
          </TableHead>
          <TableHead className="text-center">time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => {
          return (
            <TableRow key={log.passing}>
              <TableCell className="w-1/5 min-w-[90px]">
                {log.passing}
              </TableCell>
              <TableCell className="text-center">{log.time}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Content;
