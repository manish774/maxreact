import React, { useEffect, useState } from "react";
import DATA from "../mocks/data.json";
import "./Table.css";
interface CardProps {
  listHeading: { name: string; value: string };
  dictionary: any;
  config: any;
}
const Cards = ({ listHeading, dictionary }: CardProps) => {
  const dictionaryProperties = Object.keys(dictionary);

  const prepareData = dictionaryProperties.map((item) => {
    return { [item]: dictionary[item] };
  });

  const prepareHeading = (
    <tr>
      <th>{listHeading?.name}</th>
      <th>{listHeading?.value}</th>
    </tr>
  );

  const prepareBody = () => {
    return dictionaryProperties.map((prop) => (
      <tr>
        <td>{prop}</td>
        <td>{dictionary[prop]}</td>
      </tr>
    ));
  };
  return (
    <div className="table-container">
      <table>
        <thead>{prepareHeading}</thead>
        <tbody>{prepareBody()}</tbody>
      </table>
    </div>
  );
};

export default Cards;
