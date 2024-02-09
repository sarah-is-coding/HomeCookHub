import React from "react";

interface IngredientListProps {
    ingredients: Object;
    quantities: Object;
    units: Object;
}

const IngredientList: React.FC<IngredientListProps> = (props) => {
    const ingredientMap = new Map(Object.entries(props.ingredients));
    const quantityMap = new Map(Object.entries(props.quantities));
    const unitMap = new Map(Object.entries(props.units));

    return(
    <div>
        <p><b>Ingredient List:</b></p>
        <ul>
            {
                Array.from(Object.keys(props.ingredients)).map((key: string) => {
                return(<li key={key}>{quantityMap.get(key)} {unitMap.get(key)} {ingredientMap.get(key)}</li>)
            })}
        </ul>
    </div>
    );
};

export default IngredientList;