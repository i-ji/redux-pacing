// import { useState } from "react";
import { Input } from "@/components/ui/input";

type InputElType = {
  placeholder: string;
  value: string;
  setTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputEl = ({ placeholder, value, setTime }: InputElType) => {
  //   const [time, setTime] = useState<string>("");

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
