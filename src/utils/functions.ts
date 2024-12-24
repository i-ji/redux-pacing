import { LogType } from "./interface";

export const eventDistance = {
  five: "5000",
  ten: "10000",
  half: "21097.5",
  full: "42195",
};

// padstart
function timePadStart(time: string | number) {
  return String(time).padStart(2, "0");
}

// 秒を時分秒に変える処理
export function formatedTime(sec: number) {
  const numSec = Number(sec);

  let hour: number;

  if (numSec >= 60 * 60) {
    hour = Math.trunc(numSec / (60 * 60));
  } else {
    hour = 0;
  }

  const minute = Math.trunc((numSec - hour * 60 * 60) / 60);
  const second = Math.floor((numSec - hour * 60 * 60) % 60);

  return [String(hour), timePadStart(minute), timePadStart(second)];
}

// 1km辺りのタイムを秒で算出
export function totalSecondsTime(
  hour: string,
  minute: string,
  second: string,
  distance: string
) {
  const total = Math.floor(
    ((Number(hour) * 60 + Number(minute)) * 60 + Number(second)) /
      (Number(distance) / 1000)
  );

  return total;
}

// 5km,10kmなら１kmおき、half,fullなら5kmおきかの仕分け
export function getDivide(distance: string) {
  let divide: number;
  if (distance === eventDistance.five || distance === eventDistance.ten) {
    divide = 1000;
  } else {
    divide = 5000;
  }
  return divide;
}

// バリデーション
export function formValidation(
  minute: string,
  second: string,
  distance: string
) {
  if (
    minute === "" ||
    second === "" ||
    distance === "" ||
    Number(minute) < 0 ||
    Number(second) < 0 ||
    Number(minute) > 59 ||
    Number(second) > 59 ||
    /^\d{3,}$/.test(minute) ||
    /^\d{3,}$/.test(second)
  ) {
    return false;
  }
  return true;
}

// 累積タイムを配列に格納
export function calculateCumulative(distance: string, total: number) {
  // 距離が5000m or 10000mなら400mで割り、half or full なら10000mで割る。
  const divide = getDivide(distance);

  // 累積タイムのログ
  const cumulativeLogs: LogType[] = [];

  // 累積タイムを配列に格納
  for (let i = 1; i <= Math.ceil(Number(distance) / divide); i++) {
    let passing: string;
    passing = `${String(i * divide)}m`;
    let time: string[];
    time = formatedTime(i * total);

    if (distance === eventDistance.half || distance === eventDistance.full) {
      passing = `${(i * divide) / 1000}km`;
      time = formatedTime(i * 5 * total);
    }

    const newLog = {
      // passing: `${String(passing / 1000)}km`,
      passing: passing,
      time: `${time[0]}:${time[1]}:${time[2]}`,
    };
    cumulativeLogs.push(newLog);
  }

  return cumulativeLogs;
}

// finishタイムの修正
export function fixFinishTime(
  cumulativeLogs: LogType[],
  hour: string,
  minute: string,
  second: string
) {
  cumulativeLogs[cumulativeLogs.length - 1].time = `${hour.replace(
    /^0+(\d+)/,
    "$1"
  )}:${timePadStart(minute)}:${timePadStart(second)}`;
  cumulativeLogs[cumulativeLogs.length - 1].passing = "Finish";
  return cumulativeLogs;
}

// ラップタイムを配列に格納
export function calculateLap(
  cumulativeLogs: LogType[],
  distance: string,
  total: number
) {
  // ラップタイムのログ
  const cloneLogs: LogType[] = [...cumulativeLogs];
  const lapLogs: LogType[] = [];

  // ラップタイムを配列に格納
  for (let i = 0; i < cloneLogs.length; i++) {
    const passing = cloneLogs[i].passing;
    const time = cloneLogs[0].time;

    const newLogs = {
      passing: passing,
      time: time,
    };

    lapLogs.push(newLogs);
  }

  // フルマラソンとハーフマラソンの距離調整
  if (distance === eventDistance.full) {
    lapLogs[lapLogs.length - 1].time = `${
      formatedTime(2.195 * Number(total))[0]
    }:${formatedTime(2.195 * Number(total))[1]}:${
      formatedTime(2.195 * Number(total))[2]
    }`;
  } else if (distance === eventDistance.half) {
    lapLogs[lapLogs.length - 1].time = `${
      formatedTime(1.0975 * Number(total))[0]
    }:${formatedTime(1.0975 * Number(total))[1]}:${
      formatedTime(1.0975 * Number(total))[2]
    }`;
  }

  return lapLogs;
}
