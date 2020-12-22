const weights = {
    g: 1,
    oz: 28.349523125,
    lb: 453.59237,
    kg: 1000
}

export const setWeight = (i, o, w) => {
    return (w * weights[i] / weights[o]);
}