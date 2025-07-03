import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import {
  outputCumulative,
  outputLap,
  outputAvarage,
} from "@/features/FormAndDisplay/slice/TargetSlice";
import {
  totalSecondsTime,
  formValidation,
  calculateCumulative,
  calculateLap,
  fixFinishTime,
} from "@/utils/functions";

export const useTargetTime = () => {
  // 目標タイムのinput
  const [hour, setHour] = useState<string>("0");
  const [minute, setMinute] = useState<string>("00");
  const [second, setSecond] = useState<string>("00");
  const [distance, setDistance] = useState<string>("");

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

  // 距離の変更（目標タイム）
  const changeDistance = (e: string) => {
    setDistance(e);
  };

  // 目標タイムからペースを算出
  const dispatch = useAppDispatch();
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

    dispatch(outputCumulative(fixedCumulativeLogs));

    // ラップタイムのログ
    const lapLogs = [
      ...calculateLap(cumulativeLogs, distance, totalTimeInSeconds),
    ];

    dispatch(outputLap(lapLogs));
  };

  return {
    hour,
    minute,
    second,
    changeHour,
    changeMinute,
    changeSecond,
    changeDistance,
    calculateTime,
  };
};
