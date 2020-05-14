import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import './IngredientList.css';

const IngredientList = ({ingredients, units, updateIngredient}) => {
    return (
        <div className={"ingredient-list"}>
            {
                ingredients.map((ingredient, i) => {
                    return(
                        <Ingredient
                            key={'ingredient-'+i}
                            id={i}
                            name={ingredient.name}
                            percent={ingredient.percent}
                            type={ingredient.type}
                            hydration={ingredient.hydration}
                            weight={ingredient.weight}
                            units={units}
                            handler={updateIngredient}
                        />
                    )
                })
            }
        </div>
    );
}

export default IngredientList;