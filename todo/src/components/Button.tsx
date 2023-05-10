import React from "react";
interface Props {
  value: string;
  style?: Object;
}
const Button = ({ value, style }: Props) => {
  return (
    <button className="button" style={style} type="submit">
      {value}
    </button>
  );
};

export default Button;
