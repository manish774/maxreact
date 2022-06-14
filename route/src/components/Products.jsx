import React from 'react'
import { Link } from 'react-router-dom'
const Products = () => {
    console.log("k")
    return (
        <>
            <h1>Products</h1>
            <ul>
                <li>
                    <Link to="products/1/2">product1</Link>
                </li>
                <li>
                    <Link to="products/2/2">product2</Link>
                </li>
                <li>
                    <Link to="products/3/2">product3</Link>
                </li>
            </ul>
        </>
    )
}

export default Products