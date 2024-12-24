import "./App.css";
import FormAndDisplay from "./features/FormAndDisplay/FormAndDisplay";

export default function App() {
  return (
    <div className="max-w-[640px] mx-auto mt-20 px-5">
      <h1 className=" font-bold text-3xl text-center mb-10">Pacing App</h1>
      <FormAndDisplay />
    </div>
  );
}
