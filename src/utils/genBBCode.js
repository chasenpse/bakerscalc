import {setWeight} from "./setWeight";

const genBBCode = ({ingredients, totalWeight, ballWeight, totalPercent, totalFlour, hydration, options:{precision,displayUnits}}) => {
    const rows = ingredients.map(i=> `
[tr]
[td][b][size=1em]${i.name}[/size][/b][/td]
[td][right][color=#B45142][size=1em]${i.percent}%[/size][/color][/right][/td]
[td][right][size=1em]${setWeight('g',displayUnits.value,i.weight).toFixed(precision.value)}${displayUnits.value}[/size][/right][/td]
[/tr]`).join('')
    const items = `
[table]
[tr]
[td][color=#666][size=1em]Ingredient[/size][/color][/td]
[td][right][color=#666666][size=1em]Percent[/size][/color][/right][/td]
[td][right][color=#666666][size=1em]Weight (${displayUnits.value})[/size][/color][/right][/td]
[/tr]${rows}
[/table]`
    const stats = `
[table]
[tr]
[td][b][size=1em]Total Weight:[/size][/b][/td]
[td][right][size=1em]${setWeight('g',displayUnits.value,totalWeight).toFixed(precision.value)}${displayUnits.value}[/size][/right][/td]
[/tr]
[tr]
[td][b][size=1em]Ball Weight:[/size][/b][/td]
[td][right][size=1em]${setWeight('g',displayUnits.value,ballWeight).toFixed(precision.value)}${displayUnits.value}[/size][/right][/td]
[/tr]
[tr]
[td][b][size=1em]Total Percent:[/size][/b][/td]
[td][right][size=1em]${totalPercent.toFixed(precision.value)}%[/size][/right][/td]
[/tr]
[tr]
[td][b][size=1em]Total Flour:[/size][/b][/td]
[td][right][size=1em]${totalFlour.toFixed(precision.value)}${displayUnits.value}%[/size][/right][/td]
[/tr]
[tr]
[td][b][size=1em]Hydration:[/size][/b][/td]
[td][right][size=1em]${hydration.toFixed(precision.value)}%[/size][/right][/td]
[/tr]
[/table]`
    return `${items}${stats}`
}

export default genBBCode;