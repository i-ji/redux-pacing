import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectEl {
  five: string;
  ten: string;
  half: string;
  full: string;
  changeDistance: (e: string) => void;
}

const SelectEl = ({ five, ten, half, full, changeDistance }: SelectEl) => {
  return (
    <div>
      <Select onValueChange={changeDistance}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Event Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={five}>5000m</SelectItem>
          <SelectItem value={ten}>10000m</SelectItem>
          <SelectItem value={half}>Half-Marathon</SelectItem>
          <SelectItem value={full}>Marathon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectEl;
