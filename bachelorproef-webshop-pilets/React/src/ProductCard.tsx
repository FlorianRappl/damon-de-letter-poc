import * as React from 'react';
import "./ProductCard.css";
export interface ProductCard {
    name: string;
    price: number;
    description: string;
    image: string;
    addBtn: any;
}

export const ProductCard: React.FC<ProductCard> = ({ name, price, description, image, addBtn }) => {
    return (
        <div className="card">
        
            <img src={image} alt="Image header" />
            <div>
                <div className="card-title">{name}</div>
                <div className="space">
                    <p className="card-text">{description}</p>
                    <div className="coll">
                        <div className="card-title">€{price}</div>
                         {addBtn}
                    </div>
                </div>
            </div>
        </div>
    )
}