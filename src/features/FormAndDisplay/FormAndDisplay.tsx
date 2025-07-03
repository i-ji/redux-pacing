import Display from "./Display";
import TargetTimeForm from "../Target/TargetTime/TargetTimeForm";
import TargetPaceForm from "../Target/TargetPace/TargetPaceForm";
import { eventDistance } from "@/utils/functions";
import { DistanceContext } from "@/contexts/DistanceContext";
import { useTargetTime } from "./hooks/useTargetTime";
import { useTargetPace } from "./hooks/useTargetPace";
import { useDisplay } from "./hooks/useDisplay";
import { useRef } from "react";

const FormAndDisplay = () => {
  const {
    hour,
    minute,
    second,
    changeHour,
    changeMinute,
    changeSecond,
    changeDistance,
    calculateTime,
  } = useTargetTime();

  const {
    paceMinute,
    paceSecond,
    changePaceMinute,
    changePaceSecond,
    changePaceDistance,
    calculatePace,
  } = useTargetPace();

  const { avarage, cumulative, lap } = useDisplay();

  const displayRef = useRef(null);

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
          displayRef={displayRef}
        />
        <TargetPaceForm
          minute={paceMinute}
          second={paceSecond}
          changeMinute={changePaceMinute}
          changeSecond={changePaceSecond}
          changeDistance={changePaceDistance}
          calculateTime={calculatePace}
          displayRef={displayRef}
        />
      </div>
      <Display
        avarage={avarage}
        cumulative={cumulative}
        lap={lap}
        displayRef={displayRef}
      />
    </DistanceContext.Provider>
  );
};

export default FormAndDisplay;
