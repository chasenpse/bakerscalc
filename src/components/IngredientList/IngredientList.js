import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import './IngredientList.css';

const IngredientList = ({ingredients, units, onUpdateIngredient}) => {
    return (
        <div className={"ingredient-list"}>
            {
                ingredients.map((ingredient, i) => {
                    return(
                        <Ingredient
                            key={i}
                            id={i}
                            name={ingredient.name}
                            percent={ingredient.percent}
                            type={ingredient.type}
                            hydration={ingredient.hydration}
                            weight={ingredient.weight}
                            units={units}
                            onUpdateIngredient={onUpdateIngredient}
                        />
                    )
                })
            }
        </div>
    );
}

export default IngredientList;