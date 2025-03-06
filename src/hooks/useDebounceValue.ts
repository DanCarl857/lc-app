import { useEffect, useState } from "react";

function useDebounceValue(value: string, time = 250) {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
}

export default useDebounceValue;
