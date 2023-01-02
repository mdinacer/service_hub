import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const regEx = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);

const TimePicker: React.FC<Props> = ({ value, onChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleHoursChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setHours(+value);
    },
    []
  );
  const handleMinutesChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setMinutes(+value);
    },
    []
  );

  const loadValue = (value?: string) => {
    if (!value || !regEx.test(value)) return;
    const [hour, minute] = value.split(':');
    setHours(+hour);
    setMinutes(+minute);
  };

  const hoursOptions = useMemo(() => {
    return Array.from(Array(24).keys()).map((item) => (
      <option key={item} value={item}>
        {item < 10 ? `0${item}` : item}
      </option>
    ));
  }, []);

  const minutesOptions = useMemo(() => {
    return Array.from(Array(6).keys()).map((item) => (
      <option key={item} value={item * 10}>
        {item * 10 < 10 ? `0${item * 10}` : item * 10}
      </option>
    ));
  }, []);

  const setHourValue = useCallback(
    (hoursValue: number, minutesValue: number) => {
      const time = `${hoursValue < 10 ? `0${hoursValue}` : hoursValue}:${
        minutesValue < 10 ? `0${minutesValue}` : minutesValue
      }`;

      onChange(time);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setHourValue(hours, minutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours, minutes]);

  useEffect(() => {
    loadValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inline-flex gap-x-2 rounded-md border bg-gray-50 px-2 text-lg hover:bg-white dark:bg-slate-500 dark:hover:bg-slate-400">
      <select
        onChange={handleHoursChange}
        value={hours}
        className="appearance-none bg-transparent  outline-none"
      >
        {hoursOptions}
      </select>
      <span className="">:</span>
      <select
        onChange={handleMinutesChange}
        value={minutes}
        className="appearance-none bg-transparent  outline-none"
      >
        {minutesOptions}
      </select>
    </div>
  );
};

export default TimePicker;
