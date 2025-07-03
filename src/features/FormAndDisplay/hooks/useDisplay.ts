import { useAppSelector } from "@/app/hooks";

export const useDisplay = () => {
  // １キロあたりの平均タイム
  const avarage = useAppSelector((state) => state.targetPace.avarage);
  // 累積タイムのログ
  const cumulative = useAppSelector((state) => state.targetPace.cumulative);
  // ラップタイムのログ
  const lap = useAppSelector((state) => state.targetPace.lap);

  return { avarage, cumulative, lap };
};
