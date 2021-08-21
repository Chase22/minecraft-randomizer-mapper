import React, {SetStateAction} from "react";

export default function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}