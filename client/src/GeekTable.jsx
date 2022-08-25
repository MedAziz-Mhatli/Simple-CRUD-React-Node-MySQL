import React from 'react'
import JsonData from './data.json'
 function JsonDataDisplay(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.PRODUCT}</td>
                    <td>{info.QUANTITY}</td>
                    <td>{info.USER_ID}</td>
                    <td>{info.Lot}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>PRODUCT</th>
                    <th>QUANTITY</th>
                    <th>USER_ID</th>
                    <th>Lot</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 
 export default JsonDataDisplay;