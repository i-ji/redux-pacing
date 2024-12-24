import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogType } from "@/utils/interface";

interface ContentType {
  logs: LogType[];
  avarage: string;
}

const Content = ({ logs, avarage }: ContentType) => {
  // 1キロあたりの平均タイム
  const avarageMinute = Math.floor(Number(avarage) / 60);
  const avarageSecond = Math.floor(Number(avarage) % 60);

  // 1キロあたりのタイムが1時間超えたらリターン
  if (avarageMinute > 59) {
    return;
  }

  // 400mあたりのタイム
  const lapSecond = Math.floor(Number(avarage) * 0.4);

  return (
    <>
      <div className="flex items-center justify-center gap-5 py-2">
        <h2>
          1キロ平均 {String(avarageMinute)}:
          {String(avarageSecond).padStart(2, "0")}/km
        </h2>
        <h2>トラック1周 {lapSecond}秒</h2>
      </div>
      <Table>
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
    </>
  );
};

export default Content;
