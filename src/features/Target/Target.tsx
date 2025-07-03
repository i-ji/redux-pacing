import React from "react";
import { Button } from "@/components/ui/button";
import Select from "./Select";

interface TargetType {
  changeDistance: (e: string) => void;
  calculateTime: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  inputSlot: React.ReactNode;
  displayRef: React.RefObject<HTMLDivElement>;
}

const Target = ({
  changeDistance,
  calculateTime,
  title,
  inputSlot,
  displayRef,
}: TargetType) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    calculateTime(e);

    displayRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mb-10 sm:w-1/2">
      <h2 className="text-center text-2xl font-bold mb-4 sm:mb-5">{title}</h2>
      <form
        className="flex-col items-start justify-between space-y-3 sm:space-y-5"
        onSubmit={(e) => submitHandler(e)}
      >
        {inputSlot}

        <Select changeDistance={changeDistance} />
        <Button>Calculate</Button>
      </form>
    </div>
  );
};

export default Target;
