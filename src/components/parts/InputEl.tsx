import { Input } from "@/components/ui/input";

type InputElType = {
  placeholder: string;
  value: string;
  setTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputEl = ({ placeholder, value, setTime }: InputElType) => {
  return (
    <Input
      type="number"
      placeholder={placeholder}
      className="w-20"
      value={value}
      onChange={setTime}
    />
  );
};

export default InputEl;
