import { useState } from "react";

function DurationPicker({ isOpen, onClose, onSet }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    const duration = {
      hours: Number(hours),
      minutes: Number(minutes),
      seconds: Number(seconds),
    };

    // Don't allow a completely empty/zero timer
    if (
      duration.hours === 0 &&
      duration.minutes === 0 &&
      duration.seconds === 0
    ) {
      return;
    }

    onSet(duration);
    onClose();
  }

  return (
    <div className="overlay">
      <div className="duration-picker">
        <h2>Set Timer</h2>

        <form onSubmit={handleSubmit}>
          <div className="time-inputs">

            <div className="time-input">
              <label htmlFor="hours">Hours</label>
              <input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <span>:</span>

            <div className="time-input">
              <label htmlFor="minutes">Minutes</label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>

            <span>:</span>

            <div className="time-input">
              <label htmlFor="seconds">Seconds</label>
              <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>

          </div>

          <div className="picker-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              Set Timer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DurationPicker;