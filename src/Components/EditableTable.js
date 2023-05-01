import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import NumericInput from 'react-numeric-input';

const EditableTable = () => {
  const [fetchError, setFetchError] = useState();
  const [stock, setStock] = useState([]);
  const [readMode, setMode] = useState(true);

  useEffect(() => {
    fecthData();
  }, []);

  async function fecthData() {
    const { data, error } = await supabase.from("stockChampagne").select("*").order('id',  { ascending: true });
    console.log(data);
    if (error) {
      setFetchError("Could not fetch data");
      setStock(null);
      console.log(error);
    }
    if (data) {
      setStock(data);
      setFetchError(null);
      console.log(data);
    }
  }
  async function updateStock(data) {
    const { error } = await supabase
        .from("stockChampagne")
        .update(data)
        .eq("id", data.id);
    console.log(error);
  }
    const onChangeInput = async (value, name, stockId) => {

    const updatedStock = stock.map((item) => {
      if (item.id === stockId) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });

    setStock(updatedStock);

    await updateStock(updatedStock.find((item) => item.id === stockId));
  };

  return (
    fetchError || (
      <div className="container">
        <h1 className="title">Stock</h1>
        <button className={'mode'} onClick={()=>setMode(!readMode)}>
          <FontAwesomeIcon icon={readMode ? faLock : faUnlock} />
          </button>
        <table>
          <thead>
            <tr>
              <th>Cartons</th>
              <th>Bouteilles</th>
              <th>Type Champagne</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(({ id, nb_carton, nb_bouteille, type_champagne }) => (
              <tr key={id}>
                <td className="numericRow">
                  <NumericInput
                    className="numericInput"
                    name="nb_carton"
                    value={nb_carton}
                    readOnly={readMode}
                    step={1}
                    min={0}
                    onChange={(e) => onChangeInput(e,"nb_carton", id)}
                    style={{
                      arrowUp: {
                        borderBottomColor: "#232946"
                      },
                      arrowDown: {
                        borderTopColor: "#232946"
                      }
                    }}
                  />
                </td>
                <td className="numericRow">
                  <NumericInput
                    className="numericInput"
                    name="nb_bouteille"
                    value={nb_bouteille}
                    readOnly={readMode}
                    step={1}
                    min={0}
                    onChange={(e) => onChangeInput(e,"nb_bouteille", id)}
                    style={{
                      arrowUp: {
                        borderBottomColor: "#232946"
                      },
                      arrowDown: {
                        borderTopColor: "#232946"
                      }
                    }}
                  />
                </td>
                <td className={"type_champagne"}>
                  <input
                    name="type_champagne"
                    className={"type_champagne"}
                    value={type_champagne}
                    type="text"
                    readOnly="true"
                    step={1}
                    onChange={(e) => onChangeInput(e,"type_champagne", id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default EditableTable;
