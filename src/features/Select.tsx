import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DistanceContext } from "@/contexts/DistanceContext";

interface SelectEl {
  changeDistance: (e: string) => void;
}

const SelectEl = ({ changeDistance }: SelectEl) => {
  const eventDistance = useContext(DistanceContext);

  const items = [
    {
      value: eventDistance.five,
      distance: "5000m",
    },
    {
      value: eventDistance.ten,
      distance: "10000m",
    },
    {
      value: eventDistance.half,
      distance: "Half-Marathon",
    },
    {
      value: eventDistance.full,
      distance: "Marathon",
    },
  ];

  return (
    <Select onValueChange={changeDistance}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Event Distance" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          return (
            <SelectItem key={item.value} value={item.value}>
              {item.distance}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectEl;
