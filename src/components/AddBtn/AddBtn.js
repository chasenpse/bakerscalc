import React from 'react';
import './AddBtn.css';
import addBtn from './addBtn.png';

const AddBtn = ({addIngredient}) => {
    return (
        <div className={"add-item-button"}>
            <img alt={"Add Ingredient Button"} src={addBtn} onClick={addIngredient} />
        </div>
    )
}

export default AddBtn;