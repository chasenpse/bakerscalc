import React from 'react';
import './Ingredient.css';

const Ingredient = ({
    id,
    name,
    percent,
    type,
    hydration,
    weight,
    units,
    precision,
    handleNameUpdate,
    handlePercentUpdate,
    handleTypeUpdate,
    handleHydrationUpdate,
    handleRemoveIngredient,
    }) => {

    return (
        <div className={"ingredient"}>
            <div className={"ingredient__handle"} />
            <div className={"ingredient__properties"}>
                <div className={"ingredient__name"}>
                    <input placeholder={"add ingredient name"} type={"text"} name={"name"} autoComplete={"off"} value={name} onChange={e=>handleNameUpdate(id,e.target.value)} />
                </div>
                <div className={"ingredient__percent"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"percent"} value={percent} onChange={e=>handlePercentUpdate(id,e.target.value)} />
                </div>
                <div className={"ingredient__type"}>
                    <select  name={"type"} value={type} onChange={e=>handleTypeUpdate(id,e.target.value)}>
                        <option value={"none"}>n/a</option>
                        <option value={"flour"}>flour</option>
                        <option value={"liquid"}>liquid</option>
                        <option value={"starter"}>starter</option>
                    </select>
                </div>
                <div className={"ingredient__hydration"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"hydration"} value={hydration} onChange={e=>handleHydrationUpdate(id,e.target.value)} />
                </div>
                <div className={"ingredient__weight"}>{Number(weight.toFixed(precision))}<span className={"ingredient__units"}>{units}</span></div>
            </div>
            <div className={"ingredient__delete"} onClick={() => { handleRemoveIngredient(id)}} />
        </div>
    );
}

export default Ingredient;