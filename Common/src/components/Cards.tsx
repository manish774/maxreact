import React, { useEffect, useState } from "react";
import "./Table.scss";
interface CardProps {
  listHeading: { name: string; value: string };
  dictionary: any;
  config?: any; //if config not passed , it will print all object properties
}
const Cards = ({ listHeading, dictionary, config }: CardProps) => {
  const dictionaryProperties = Object.keys(dictionary);
  const [dataObject, setDataObject] = useState<any>();

  const prepareData = dictionaryProperties.map((item) => {
    return { [item]: dictionary[item] };
  });

  useEffect(() => {
    setDataObject(dictionary);
  }, [dictionary]);

  const prepareHeading = (
    <tr>
      <th>{listHeading?.name}</th>
      <th>{listHeading?.value}</th>
    </tr>
  );

  const prepareBody = () => {
    return config
      ? config.map(
          (prop: any) =>
            dataObject && (
              <tr>
                <td>{prop?.name}</td>
                <td>
                  {prop?.render
                    ? prop?.render(dataObject)
                    : dataObject[prop?.id]}
                </td>
              </tr>
            )
        )
      : dictionaryProperties.map(
          (prop: any) =>
            dataObject && (
              <tr>
                <td>{prop}</td>
                <td>{dataObject[prop]}</td>
              </tr>
            )
        );
  };

  const closeList = () => {
    setDataObject("");
  };

  return (
    dataObject && (
      <div className="table-container">
        <div style={{ padding: "5px", border: "1px solid gray" }}>
          <div style={{ textAlign: "right" }}>
            <button onClick={closeList}>x</button>
          </div>
          <div>
            <table>
              <thead>{prepareHeading}</thead>
              <tbody>{prepareBody()}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default Cards;
