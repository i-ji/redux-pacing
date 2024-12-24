import InputEl from "../../components/parts/InputEl";

interface InputType {
  minute: string;
  second: string;
  changeMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ minute, second, changeMinute, changeSecond }: InputType) => {
  return (
    <div className="flex items-center gap-1">
      <div>
        <InputEl placeholder="Min" value={minute} setTime={changeMinute} />
      </div>
      :
      <div>
        <InputEl placeholder="Sec" value={second} setTime={changeSecond} />
      </div>
      /km
    </div>
  );
};

export default Input;
