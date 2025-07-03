import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import {
  outputCumulative,
  outputLap,
  outputAvarage,
} from "@/features/FormAndDisplay/slice/TargetSlice";
import {
  formatedTime,
  formValidation,
  calculateCumulative,
  calculateLap,
  fixFinishTime,
} from "@/utils/functions";

export const useTargetPace = () => {
  // 目標ペースのinput
  const [paceMinute, setPaceMinute] = useState<string>("0");
  const [paceSecond, setPaceSecond] = useState<string>("00");
  const [paceDistance, setPaceDistance] = useState<string>("");

  // 目標ペースの分の変更
  const changePaceMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceMinute(e.target.value);
  };
  // 目標ペースの秒の変更
  const changePaceSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceSecond(e.target.value);
  };

  // 距離の変更（目標ペース）
  const changePaceDistance = (e: string) => {
    setPaceDistance(e);
  };

  // 目標ペースからゴールタイムを算出
  const dispatch = useAppDispatch();
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

  return {
    paceMinute,
    paceSecond,
    changePaceMinute,
    changePaceSecond,
    changePaceDistance,
    calculatePace,
  };
};
