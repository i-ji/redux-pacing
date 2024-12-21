import InputEl from "@/components/parts/InputEl";

interface InputType {
  hour: string;
  minute: string;
  second: string;
  changeHour: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TargetTimeInput = ({
  hour,
  minute,
  second,
  changeHour,
  changeMinute,
  changeSecond,
}: InputType) => {
  return (
    <div className="flex items-center gap-1">
      <div>
        <InputEl placeholder="Hour" value={hour} setTime={changeHour} />
      </div>
      :
      <div>
        <InputEl placeholder="Min" value={minute} setTime={changeMinute} />
      </div>
      :
      <div>
        <InputEl placeholder="Sec" value={second} setTime={changeSecond} />
      </div>
    </div>
  );
};

export default TargetTimeInput;
