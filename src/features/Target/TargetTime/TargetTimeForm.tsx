import TargetTimeInput from "./TargetTimeInput";
import Target from "../Target";
import { CommonTargetTimeProps } from "@/utils/interface";

interface FormType extends CommonTargetTimeProps {
  hour: string;
  changeHour: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
}

const TargetTimeForm = ({
  hour,
  minute,
  second,
  changeHour,
  changeMinute,
  changeSecond,
  changeDistance,
  calculateTime,
  displayRef,
}: FormType) => {
  const inputSlot = (
    <TargetTimeInput
      hour={hour}
      minute={minute}
      second={second}
      changeHour={changeHour}
      changeMinute={changeMinute}
      changeSecond={changeSecond}
    />
  );

  return (
    <Target
      inputSlot={inputSlot}
      title="Target Time"
      changeDistance={changeDistance}
      calculateTime={calculateTime}
      displayRef={displayRef}
    />
  );
};

export default TargetTimeForm;
