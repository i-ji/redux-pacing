import { Button } from "@/components/ui/button";

import TargetPaceInput from "./TargetPaceInput";
import Select from "./Select";

interface FormType {
  minute: string;
  second: string;
  changeMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDistance: (e: string) => void;
  five: string;
  ten: string;
  half: string;
  full: string;
  calculateTime: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TargetPaceForm = ({
  minute,
  second,
  changeMinute,
  changeSecond,
  changeDistance,
  five,
  ten,
  half,
  full,
  calculateTime,
}: FormType) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    calculateTime(e);
  };

  return (
    <div className="mb-10 sm:w-1/2">
      <h2 className="text-center text-2xl font-bold mb-5">Target Pace</h2>
      <form
        action=""
        className="flex-col items-start justify-between space-y-3 sm:space-y-5"
        onSubmit={(e) => submitHandler(e)}
      >
        <TargetPaceInput
          minute={minute}
          second={second}
          changeMinute={changeMinute}
          changeSecond={changeSecond}
        />

        <Select
          five={five}
          ten={ten}
          half={half}
          full={full}
          changeDistance={changeDistance}
        />

        <div>
          <Button>Calculate</Button>
        </div>
      </form>
    </div>
  );
};

export default TargetPaceForm;
