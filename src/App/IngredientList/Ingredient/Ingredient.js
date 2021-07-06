import React, {useState} from 'react';
import './Ingredient.css';

const Ingredient = ({
    uuid,
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
    const [show, setShow] = useState(true);

    return (
        <div className={"ingredient"}
            style={{
                animationName: `${show ? "fadeIn, slideIn" : "fadeOut, slideOut"}`
            }}
             onAnimationEnd={()=>show ? null : handleRemoveIngredient(uuid)}
        >
            <div className={"ingredient__properties"}>
                <div className={"ingredient__name"}>
                    <input placeholder={"add ingredient name"} type={"text"} name={"name"} autoComplete={"off"} value={name} onChange={e=>handleNameUpdate(uuid,e.target.value)} />
                </div>
                <div className={"ingredient__percent"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"percent"} value={percent} onChange={e=>handlePercentUpdate(uuid,e.target.value)} />
                </div>
                <div className={"ingredient__type"}>
                    <select  name={"type"} value={type} onChange={e=>handleTypeUpdate(uuid,e.target.value)}>
                        <option value={"none"}>n/a</option>
                        <option value={"flour"}>flour</option>
                        <option value={"liquid"}>liquid</option>
                        <option value={"starter"}>starter</option>
                    </select>
                </div>
                <div className={"ingredient__hydration"}>
                    <input inputMode="decimal" placeholder={"-"} type={"number"} min={"0"} step={"0.01"} name={"hydration"} value={hydration} onChange={e=>handleHydrationUpdate(uuid,e.target.value)} />
                </div>
                <div className={"ingredient__weight"}>{Number(weight.toFixed(precision))}<span className={"ingredient__units"}>{units}</span></div>
            </div>
            <div
                className={"ingredient__delete"}
                onClick={()=>setShow(false)}
            />
        </div>
    );
}

export default Ingredient;