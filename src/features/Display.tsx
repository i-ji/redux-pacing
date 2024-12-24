import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Content from "@/components/parts/display/Content";
import { LogType } from "@/utils/interface";

interface DisplayType {
  avarage: string;
  cumulative: LogType[];
  lap: LogType[];
}

const Display = ({ avarage, cumulative, lap }: DisplayType) => {
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
        <Content logs={cumulative} avarage={avarage} />
      </TabsContent>
      <TabsContent value="lap">
        <Content logs={lap} avarage={avarage} />
      </TabsContent>
    </Tabs>
  );
};

export default Display;
