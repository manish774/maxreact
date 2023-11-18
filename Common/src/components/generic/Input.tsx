import React, { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/hooks";
interface InputProps {
  onchangeHandler: (value: string) => any;
  type?: "number" | "text" | "email";
  max?: number;
  min?: number;
  value: any;
}
const Input: React.FC<InputProps> = (props: InputProps) => {
  const { onchangeHandler } = props;
  const [inputValue, setInputValue] = useState<any>(props?.min || undefined);
  const [eventObject, setEventObject] = useState<any>();
  const debounceInput = useDebounce(eventObject, 500);

  useEffect(() => {
    onchangeHandler(debounceInput);
  }, [debounceInput]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      props?.type === "number" &&
      props?.max &&
      parseInt(e?.target?.value) > props?.max
    ) {
      return e.preventDefault();
    }
    setEventObject(e);
    setInputValue(e?.target?.value);
  };

  return (
    <input
      type={props?.type}
      onChange={changeHandler}
      value={inputValue}
      min={props?.min}
      max={props?.max}
    />
  );
};

export default Input;
