import "./App.css";
import {  useState } from "react";
import Axios from "axios";
import JsonDataDisplay from './GeekTable'
import {Routes, Route, useNavigate} from 'react-router-dom';
import GeekTable from './GeekTable';

function App() {
  const [ROWID, setROWID] = useState("");
  const [PRODUCT, setPRODUCT] = useState("");
  const [QUANTITY, setQUANTITY] = useState("");
  const [USER_ID	, setUSER_ID	] = useState("");
  const [BINLABEL	, setBINLABEL	] = useState("");

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

  const navigate = useNavigate();
  
  const navigateToProducts = () => {
    // navigate to /products
    navigate('/GeekTable');
  };

  /*
  const getProducts = () => {
    return (
      <div className="App">
        
        <JsonDataDisplay/>
   
      </div>
    );
  };
  */

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([ROWID+"^"+PRODUCT+"^"], {
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
            <div>
              <button onClick={downloadTxtFile}>Download txt</button>
            </div>
  
      </div>
      <div className="produits">

        <button onClick={navigateToProducts}>Show Products</button>

        <Routes>
          <Route exact path='/GeekTable' component={GeekTable} />
        </Routes>

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
