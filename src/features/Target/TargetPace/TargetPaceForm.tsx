import TargetPaceInput from "./TargetPaceInput";
import Target from "../Target";
import { CommonTargetTimeProps } from "@/utils/interface";

const TargetPaceForm = ({
  minute,
  second,
  changeMinute,
  changeSecond,
  changeDistance,
  calculateTime,
  displayRef,
}: CommonTargetTimeProps) => {
  const inputSlot = (
    <TargetPaceInput
      minute={minute}
      second={second}
      changeMinute={changeMinute}
      changeSecond={changeSecond}
    />
  );

  return (
    <Target
      title="Target Pace"
      inputSlot={inputSlot}
      changeDistance={changeDistance}
      calculateTime={calculateTime}
      displayRef={displayRef}
    />
  );
};

export default TargetPaceForm;
