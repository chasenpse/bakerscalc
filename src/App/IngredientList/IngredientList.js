import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import './IngredientList.css';

const IngredientList = ({ingredients, units, handleNameUpdate, handlePercentUpdate, handleTypeUpdate, handleHydrationUpdate, handleRemoveIngredient, precision}) => {
    return (
        <div className={"ingredient-list"}>
            {
                ingredients.length ?
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
                                handleNameUpdate={handleNameUpdate}
                                handlePercentUpdate={handlePercentUpdate}
                                handleTypeUpdate={handleTypeUpdate}
                                handleHydrationUpdate={handleHydrationUpdate}
                                handleRemoveIngredient={handleRemoveIngredient}
                                precision={precision}
                            />
                        )
                    }) : <div className={"placeholder"}>Use the <span className={"addHl"}>+</span> button to start adding ingredients</div>
            }
        </div>
    );
}

export default IngredientList;