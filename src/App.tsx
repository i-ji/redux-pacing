import { useState } from "react";
import "./App.css";
import Display from "./features/Display";
import TargetTimeForm from "./features/TargetTimeForm";
import TargetPaceForm from "./features/TargetPaceForm";
// import TargetForm from "./features/TargetForm";
import { LogType } from "./utils/interface";
import { five } from "./utils/functions";
import { ten } from "./utils/functions";
import { half } from "./utils/functions";
import { full } from "./utils/functions";
import { formatedTime } from "./utils/functions";
import { totalSecondsTime } from "./utils/functions";
import { formValidation } from "./utils/functions";
import { calculateCumulative } from "./utils/functions";
import { calculateLap } from "./utils/functions";
import { fixFinishTime } from "./utils/functions";

function App() {
  // 目標タイムのinput
  const [hour, setHour] = useState<string>("0");
  const [minute, setMinute] = useState<string>("00");
  const [second, setSecond] = useState<string>("00");
  const [distance, setDistance] = useState<string>("");

  // 目標ペースのinput
  const [paceMinute, setPaceMinute] = useState<string>("0");
  const [paceSecond, setPaceSecond] = useState<string>("00");
  const [paceDistance, setPaceDistance] = useState<string>("");

  // 目標タイムの時間の変更
  const changeHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(e.target.value);
  };
  // 目標タイムの分の変更
  const changeMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(e.target.value);
  };
  // 目標タイムの秒の変更
  const changeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecond(e.target.value);
  };

  // 目標ペースの分の変更
  const changePaceMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceMinute(e.target.value);
  };
  // 目標ペースの秒の変更
  const changePaceSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceSecond(e.target.value);
  };

  // １キロあたりの平均タイム
  const [avarage, setAavarage] = useState("");

  // 距離の変更（目標タイム）
  const changeDistance = (e: string) => {
    setDistance(e);
  };

  // 距離の変更（目標ペース）
  const changePaceDistance = (e: string) => {
    setPaceDistance(e);
  };

  // 累積タイムのログ
  const [cumulative, setCumulative] = useState<LogType[]>([]);

  // ラップタイムのログ
  const [lap, setLap] = useState<LogType[]>([]);

  // 目標タイムからペースを算出
  const calculateTime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーション
    if (
      !formValidation(minute, second, distance) ||
      hour === "" ||
      Number(hour) < 0 ||
      Number(hour) > 23
    ) {
      setHour("0");
      setMinute("00");
      setSecond("00");
      return;
    }

    // 合計タイムの秒数
    const total = totalSecondsTime(hour, minute, second, distance);
    setAavarage(String(total));

    // 累積タイムを配列に格納
    const cumulativeLogs = [...calculateCumulative(distance, total)];

    const fixedCumulativeLogs = fixFinishTime(
      cumulativeLogs,
      hour,
      minute,
      second
    );

    setCumulative(fixedCumulativeLogs);

    // ラップタイムのログ
    const lapLogs = [...calculateLap(cumulativeLogs, distance, total)];

    setLap(lapLogs);
  };

  // 目標ペースからゴールタイムを算出
  const calculatePace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーション
    if (!formValidation(paceMinute, paceSecond, paceDistance)) {
      setPaceMinute("0");
      setPaceSecond("00");
      return;
    }

    // タイムを秒に直す
    const total = Number(paceMinute) * 60 + Number(paceSecond);

    setAavarage(String(total));

    // 累積タイムを配列に格納
    const cumulativeLogs = [...calculateCumulative(paceDistance, total)];

    // finish時点のタイム
    const time = formatedTime(total * (Number(paceDistance) / 1000));
    const fixedCumulativeLogs = fixFinishTime(
      cumulativeLogs,
      time[0],
      time[1],
      time[2]
    );

    setCumulative(fixedCumulativeLogs);

    //  ラップタイムのログ
    const lapLogs = [...calculateLap(cumulativeLogs, paceDistance, total)];

    setLap(lapLogs);
  };

  return (
    <div className="max-w-[640px] mx-auto mt-20 px-5">
      <h1 className=" font-bold text-3xl text-center mb-10">Pacing App</h1>
      <div className="sm:flex sm:justify-between sm:items-center">
        <TargetTimeForm
          hour={hour}
          minute={minute}
          second={second}
          changeHour={changeHour}
          changeMinute={changeMinute}
          changeSecond={changeSecond}
          changeDistance={changeDistance}
          five={five}
          ten={ten}
          half={half}
          full={full}
          calculateTime={calculateTime}
        />
        <TargetPaceForm
          minute={paceMinute}
          second={paceSecond}
          changeMinute={changePaceMinute}
          changeSecond={changePaceSecond}
          changeDistance={changePaceDistance}
          five={five}
          ten={ten}
          half={half}
          full={full}
          calculateTime={calculatePace}
        />
      </div>
      <Display avarage={avarage} cumulative={cumulative} lap={lap} />
    </div>
  );
}

export default App;
