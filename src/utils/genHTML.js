import {setWeight} from "./setWeight";

const genHTML = ({ingredients, totalWeight, ballWeight, totalPercent, totalFlour, hydration, options:{precision,displayUnits}}) => {
    const rows = ingredients.map(i=> `
    <tr>
        <td>${i.name}</td>
        <td style='text-align: right;'>${i.percent}%</td>
        <td style='text-align: right;'>${setWeight('g',displayUnits.value,i.weight).toFixed(precision.value)}${displayUnits.value}</td>
    </tr>`).join('')

    const items = `
<table border='1' cellPadding='5'>
    <tr>
        <th>Ingredient</th>
        <th>Percent</th>
        <th>Weight (${displayUnits.value})</th>
    </tr>${rows}
</table>`
    const stats = `
<table border='1' cellpadding='5'>
    <tr>
        <th style='text-align: left;'>Total Weight</th>
        <td style='text-align: right;'>${setWeight('g',displayUnits.value,totalWeight).toFixed(precision.value)}${displayUnits.value}</td>
    </tr>
    <tr>
        <th style='text-align: left;'>Ball Weight</th>
        <td style='text-align: right;'>${setWeight('g',displayUnits.value,ballWeight).toFixed(precision.value)}${displayUnits.value}</td>
    </tr>
    <tr>
        <th style='text-align: left;'>Total Percent</th>
        <td style='text-align: right;'>${totalPercent.toFixed(precision.value)}%</td>
    </tr>
    <tr>
        <th style='text-align: left;'>Total Flour</th>
        <td style='text-align: right;'>${totalFlour.toFixed(precision.value)}${displayUnits.value}%</td>
    </tr>
    <tr>
        <th style='text-align: left;'>Hydration</th>
        <td style='text-align: right;'>${hydration.toFixed(precision.value)}%</td>
    </tr>
</table>`
    return `${items}${stats}`
}

export default genHTML;