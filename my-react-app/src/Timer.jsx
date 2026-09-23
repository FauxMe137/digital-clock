import {useState, useEffect, useRef} from "react";
import DurationPicker from "./DurationPicker";
import alarmSound from "./assets/gumdrop.mp3"

function Timer(){
    
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const intervalIdRef = useRef(null);
    const endTimeRef = useRef(0);
    const alarmRef = useRef(new Audio(alarmSound));
    const [showPicker, setShowPicker] = useState(false);
    const [duration, setDuration] = useState(5 * 60 * 1000);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                const timeLeft = endTimeRef.current - Date.now();

                if(timeLeft <= 0){
                    setRemainingTime(0);
                    setIsRunning(false);
                    clearInterval(intervalIdRef.current);
                    alarmRef.current.play().catch(error => {
                        console.log("Alarm failed:", error)
                    });
                } else {
                    setRemainingTime(timeLeft);
                }
            }, 10);

            return () => {
                    clearInterval(intervalIdRef.current);
                }
        }

    }, [isRunning]);

    function startTimer(){
        setIsRunning(true);
        endTimeRef.current = Date.now() + remainingTime;
    }

    function pauseTimer(){
        setIsRunning(false);
    }

    function resetTimer(){
        setIsRunning(false);
        setRemainingTime(duration);
    }

    function setTimer(time){
        const totalTime = (time.hours * 60 * 60 * 1000) + (time.minutes * 60 * 1000) + (time.seconds * 1000);

        setDuration(totalTime);
        setRemainingTime(totalTime);
        setIsRunning(false);
    }

    function formatTimer(){
        let hours = Math.floor(remainingTime / (1000 * 60 * 60));
        let minutes = Math.floor(remainingTime / (1000 * 60) % 60);
        let seconds = Math.floor(remainingTime / 1000 % 60);
        let milliseconds = Math.floor((remainingTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        if(Number(hours) < 1){
            return `${minutes}:${seconds}:${milliseconds}`;
        } else {
            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        }
    }

    return(
        <div className="timer">
            <div className="display">{formatTimer()}</div>
            <div className="controls">
                <button onClick={startTimer} className="start-button">Start</button>
                <button onClick={pauseTimer} className="pause-button">Pause</button>
                <button onClick={resetTimer} className="reset-button">Reset</button>
                <button onClick={() => setShowPicker(true)} className="set-timer-button">Set Timer</button>
            </div>
            <DurationPicker
                isOpen={showPicker}
                onClose={() => setShowPicker(false)}
                onSet={setTimer}
            />
        </div>
    );
}

export default Timer;