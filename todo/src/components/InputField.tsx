import React, { useRef } from "react";

interface Prpos {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  style?: Object;
  inputStyle?: Object | undefined;
}
const InputField = ({ todo, setTodo, style, inputStyle }: Prpos) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={style}>
      <input
        ref={inputRef}
        type="text"
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter"
        style={inputStyle}
      />
    </div>
  );
};

export default InputField;
