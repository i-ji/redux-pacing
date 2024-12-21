import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Content from "@/components/parts/display/Content";
import { LogType } from "@/utils/interface";

interface DisplayType {
  avarage: string;
  cumulative: LogType[];
  lap: LogType[];
}

const Display = ({ avarage, cumulative, lap }: DisplayType) => {
  // 1キロあたりの平均タイム
  const avarageMinute = Math.floor(Number(avarage) / 60);
  const avarageSecond = Math.floor(Number(avarage) % 60);

  if (avarageMinute >= 59) {
    return;
  }

  // 400mあたりのタイム
  const lapSecond = Math.floor(Number(avarage) * 0.4);
  return (
    <Tabs defaultValue="cumulative" className="w-full text-center pb-20">
      <TabsList className="w-full">
        <TabsTrigger value="cumulative" className="w-1/2">
          タイム
        </TabsTrigger>
        <TabsTrigger value="lap" className="w-1/2">
          ラップ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cumulative">
        <div className="flex items-center justify-center gap-5 py-2">
          <h2>
            1キロ平均 {String(avarageMinute)}:
            {String(avarageSecond).padStart(2, "0")}/km
          </h2>
          <h2>トラック1周 {lapSecond}秒</h2>
        </div>
        <Content logs={cumulative} />
      </TabsContent>
      <TabsContent value="lap">
        <div className="flex items-center justify-center gap-5">
          <h2>
            1キロ平均 {String(avarageMinute)}:
            {String(avarageSecond).padStart(2, "0")}/km
          </h2>
          <h2>トラック1周 {lapSecond}秒</h2>
        </div>
        <Content logs={lap} />
      </TabsContent>
    </Tabs>
  );
};

export default Display;
