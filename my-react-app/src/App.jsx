import DigitalClock from "./DigitalClock";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";

function App() {
  return <div className="app-container">
    <Stopwatch/>
    <Timer/>
    <DigitalClock/>
  </div>;
}

export default App
