import React from 'react';
// import { useSpring, animated } from 'react-spring'
// import { useDrag } from 'react-use-gesture'
import './Ingredient.css';

const Ingredient = ({id, name, percent, type, hydration, weight, units, onUpdateIngredient}) => {

    const updateItem = (e) => {
        onUpdateIngredient(id, e.target.name, e.target.value);
    }

    return (
        <div className={"ingredient"}>
            <div className={"ingredient__properties"}>
                <div className={"ingredient__name"}>
                    <input placeholder={"add ingredient name"} type={"text"} name={"name"} autoComplete={"off"} value={name} onChange={updateItem} />
                </div>
                <div className={"ingredient__percent"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"percent"} value={percent} onChange={updateItem} />
                </div>
                <div className={"ingredient__type"}>
                    <select  name={"type"} value={type} onChange={updateItem}>
                        <option value={"none"}>n/a</option>
                        <option value={"flour"}>flour</option>
                        <option value={"liquid"}>liquid</option>
                        <option value={"starter"}>starter</option>
                    </select>
                </div>
                <div className={"ingredient__hydration"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"hydration"} value={hydration} onChange={updateItem} />
                </div>
                <div className={"ingredient__weight"}>{weight}<span className={"ingredient__units"}>{units}</span></div>
            </div>
            <div className={"ingredient__delete"}>X</div>
        </div>
    );
}

export default Ingredient;