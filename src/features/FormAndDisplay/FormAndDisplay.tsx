import { useState } from "react";
import Display from "../Display";
import TargetTimeForm from "../TargetTime/TargetTimeForm";
import TargetPaceForm from "../TargetPace/TargetPaceForm";
import { eventDistance } from "@/utils/functions";
import {
  formatedTime,
  totalSecondsTime,
  formValidation,
  calculateCumulative,
  calculateLap,
  fixFinishTime,
} from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  outputCumulative,
  outputLap,
  outputAvarage,
} from "@/features/FormAndDisplay/TargetSlice";
import { DistanceContext } from "@/contexts/DistanceContext";
// export const DistanceContext = createContext({});

const FormAndDisplay = () => {
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
  const avarage = useAppSelector((state) => state.targetPace.avarage);

  // 距離の変更（目標タイム）
  const changeDistance = (e: string) => {
    setDistance(e);
  };

  // 距離の変更（目標ペース）
  const changePaceDistance = (e: string) => {
    setPaceDistance(e);
  };

  const dispatch = useAppDispatch();

  // 累積タイムのログ
  const cumulative = useAppSelector((state) => state.targetPace.cumulative);

  // ラップタイムのログ
  const lap = useAppSelector((state) => state.targetPace.lap);

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
    const totalTimeInSeconds = totalSecondsTime(hour, minute, second, distance);
    dispatch(outputAvarage(totalTimeInSeconds));
    // setAavarage(String(totalTimeInSeconds));

    // 累積タイムを配列に格納
    const cumulativeLogs = [
      ...calculateCumulative(distance, totalTimeInSeconds),
    ];

    const fixedCumulativeLogs = fixFinishTime(
      cumulativeLogs,
      hour,
      minute,
      second
    );

    // setCumulative(fixedCumulativeLogs);
    dispatch(outputCumulative(fixedCumulativeLogs));

    // ラップタイムのログ
    const lapLogs = [
      ...calculateLap(cumulativeLogs, distance, totalTimeInSeconds),
    ];

    // setLap(lapLogs);
    dispatch(outputLap(lapLogs));
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

    // 1キロごとのタイムを秒に直す
    const secondsPerKilometer = Number(paceMinute) * 60 + Number(paceSecond);

    // setAavarage(String(secondsPerKilometer));
    dispatch(outputAvarage(String(secondsPerKilometer)));

    // 累積タイムを配列に格納
    const cumulativeLogs = [
      ...calculateCumulative(paceDistance, secondsPerKilometer),
    ];

    // finish時点のタイム
    const time = formatedTime(
      secondsPerKilometer * (Number(paceDistance) / 1000)
    );
    const fixedCumulativeLogs = fixFinishTime(
      cumulativeLogs,
      time[0],
      time[1],
      time[2]
    );

    // setCumulative(fixedCumulativeLogs);
    dispatch(outputCumulative(fixedCumulativeLogs));

    //  ラップタイムのログ
    const lapLogs = [
      ...calculateLap(cumulativeLogs, paceDistance, secondsPerKilometer),
    ];

    // setLap(lapLogs);
    dispatch(outputLap(lapLogs));
  };
  return (
    <DistanceContext.Provider value={eventDistance}>
      <div className="sm:flex sm:justify-between sm:items-center">
        <TargetTimeForm
          hour={hour}
          minute={minute}
          second={second}
          changeHour={changeHour}
          changeMinute={changeMinute}
          changeSecond={changeSecond}
          changeDistance={changeDistance}
          calculateTime={calculateTime}
        />
        <TargetPaceForm
          minute={paceMinute}
          second={paceSecond}
          changeMinute={changePaceMinute}
          changeSecond={changePaceSecond}
          changeDistance={changePaceDistance}
          calculateTime={calculatePace}
        />
      </div>
      <Display avarage={avarage} cumulative={cumulative} lap={lap} />
    </DistanceContext.Provider>
  );
};

export default FormAndDisplay;
