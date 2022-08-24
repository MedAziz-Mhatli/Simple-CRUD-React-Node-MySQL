import "./App.css";
import { Component, useState } from "react";
import Axios from "axios";

function App() {
  const [ROWID, setROWID] = useState("");
  const [PRODUCT, setPRODUCT] = useState("");
  const [QUANTITY, setQUANTITY] = useState("");
  const [USER_ID	, setUSER_ID	] = useState("");
  const [BINLABEL	, setBINLABEL	] = useState("");

  //const [newWage, setNewWage] = useState(0);

  const [ProductList, setProductList] = useState([]);

  const addProducts = () => {
    Axios.post("http://localhost:3000/create", {
      ROWID: ROWID,
      PRODUCT: PRODUCT,
      QUANTITY: QUANTITY,
      USER_ID: USER_ID,
      BINLABEL: BINLABEL,
    }).then(() => {
      setProductList([
        ...ProductList,
        {
          ROWID: ROWID,
          PRODUCT: PRODUCT,
          QUANTITY: QUANTITY,
          USER_ID: USER_ID,
          BINLABEL: BINLABEL,
        },
      ]);
    });
  };

  const getProducts = () => {
    Axios.get("http://localhost:3000/products").then((response) => {
      setProductList(response.data);
    });
  };

  /*const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
*/

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(["hello world"], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      <div className="information">
        <div>
          <button onClick={downloadTxtFile}>Download txt</button>
        </div>

        <label>ROWID</label>
        <input
          type="text"
          onChange={(event) => {
            setROWID(event.target.value);
          }}
        />
        <label>PRODUCT</label>
        <input
          type="text"
          onChange={(event) => {
            setPRODUCT(event.target.value);
          }}
        />
        <label>QUANTITY:</label>
        <input
          type="text"
          onChange={(event) => {
            setQUANTITY(event.target.value);
          }}
        />
        <label>USER_ID:</label>
        <input
          type="text"
          onChange={(event) => {
            setUSER_ID(event.target.value);
          }}
        />
        <label>BINLABEL</label>
        <input
          type="text"
          onChange={(event) => {
            setBINLABEL(event.target.value);
          }}
        />
            <button onClick={addProducts}>Add Produit</button>
  
      </div>
      <div className="produits">
        <button onClick={getProducts}>Show Products</button>

        {ProductList.map((val, key) => {
          return (
            <div className="produit">
              <div>
                <h3>ROWID: {val.ROWID}</h3>
                <h3>PRODUCT: {val.PRODUCT}</h3>
                <h3>QUANTITY: {val.QUANTITY}</h3>
                <h3>USER_ID: {val.USER_ID}</h3>
                <h3>BINLABEL: {val.BINLABEL}</h3>
              </div>
             </div> 
          );}
        )}
      </div>
    </div>
  );
}

export default App;
