export interface LogType {
  passing: string;
  time: string;
}

export interface CommonTargetTimeProps {
  minute: string;
  second: string;
  changeMinute: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSecond: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDistance: (e: string) => void;
  calculateTime: (e: React.FormEvent<HTMLFormElement>) => void;
  displayRef: React.RefObject<HTMLDivElement>;
}
