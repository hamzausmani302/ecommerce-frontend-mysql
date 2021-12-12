    import React from 'react'

    export default function TableItems(props) {
        return (
            <div>
    <table class="table table-hover table-striped">
    <thead>
        <tr>
        <th scope="col">ProductID</th>
        <th scope="col">ProductName</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((el,index)=>{
            return (
                <tr>
                <th scope="row">{el.PRODUCT_ID}</th>
                <td>{el.PRODUCT_NAME}</td>
                <td>{el.QUANTITY}</td>
                <td>{el.PRICE}</td>
                </tr>
            )
        })}


        
    </tbody>
    </table>
            </div>
        )
    }
