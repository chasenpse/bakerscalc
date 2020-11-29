import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import OptionsMenu from "./components/OptionsMenu/OptionsMenu";
import DoughStatsList from './components/DoughStatsList/DoughStatsList';
import IngredientList from "./components/IngredientList/IngredientList";
import AddBtn from "./components/AddBtn/AddBtn";

class App extends Component {

    oz = 28.349523125;
    lb = 453.59237;
    kg = 1000;

    constructor(props) {
        super(props);
        this.state = {
            formulaTitle: '',
            createDate: '',
            ingredients: [],
            totalWeight: 0,
            ballWeight: 0,
            totalPercent: 0,
            totalFlour: 0,
            hydration: 0,
            optionsVisible: false,
            options: {
                numOfDoughBalls: {
                    label: '# of balls',
                    value: 1,
                    group: 'global',
                    type: 'input',
                    min: 1,
                    position: 1
                },
                displayUnits: {
                    label: 'display units',
                    value: 'g',
                    group: 'global',
                    type: 'select',
                    data: ['g', 'oz', 'lb', 'kg'],
                    position: 2
                },
                bowlResiduePercent: {
                    label: 'bowl residue percent',
                    value: 0,
                    group: 'global',
                    type: 'input',
                    step: 0.01,
                    position: 3
                },
                precision: {
                    label: 'precision',
                    value: 2,
                    group: 'global',
                    type: 'input',
                    position: 4
                },
                calcMode: {
                    label: 'calc mode',
                    value: 'baker\'s percentage',
                    group: 'global',
                    type: 'select',
                    data: ['baker\'s percentage', 'thickness factor'],
                    position: 5
                },
                ballWeight: {
                    label: 'ball weight',
                    value: 453.59,
                    group: 'baker\'s percentage',
                    type: 'input',
                    position: 6
                },
                thicknessFactor: {
                    label: 'thickness factor',
                    value: 0.1,
                    group: 'thickness factor',
                    type: 'input',
                    step: 0.001,
                    position: 7
                },
                panShape: {
                    label: 'pan shape',
                    value: 'circular',
                    group: 'thickness factor',
                    type: 'select',
                    data: ['circular', 'rectangular'],
                    position: 8
                },
                panDiameter: {
                    label: 'pan diameter',
                    value: 14,
                    group: 'thickness factor',
                    type: 'input',
                    position: 9
                },
                panLength: {
                    label: 'pan length',
                    value: 9,
                    group: 'thickness factor',
                    type: 'input',
                    position: 10
                },
                panWidth: {
                    label: 'pan width',
                    value: 13,
                    group: 'thickness factor',
                    type: 'input',
                    position: 11
                }
            }
        }
    }

    addIngredient = () => {
        const ingredient = {
            name: '',
            percent: '',
            type: 'none',
            hydration: '',
            weight: 0,
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]});
    }

    handleNameUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, name: val } : ingredient
            ),
        }));
    }

    handlePercentUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, percent: val } : ingredient
            ),
        }), () => this.calculate());
    }

    handleTypeUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, type: val } : ingredient
            ),
        }), () => this.calculate());
    }

    handleHydrationUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, hydration: val } : ingredient
            ),
        }), () => this.calculate());
    }

    handleRemoveIngredient = (id) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter((ingredient, i)=>i!==id)
        }), () => this.calculate());
    }

    updateOption = (id, type, val) => {
        switch (type) {
            case 'input':
                this.setState(
                    prevState => ({
                        options: {
                            ...prevState.options, [id]: {
                                ...prevState.options[id], value: Number(val)
                            }
                        }
                    }), () => this.calculate()
                );
                break;
            default:
                if (id === "displayUnits") {
                    console.log("wow");
                    this.setState(
                        prevState => ({
                            options: {
                                ...prevState.options, [id]: {
                                    ...prevState.options[id], value: val
                                }
                            }
                        }), () => this.calculate());
                    break;
                } else {
                    this.setState(
                        prevState => ({
                            options: {
                                ...prevState.options, [id]: {
                                    ...prevState.options[id], value: val
                                }
                            }
                        }), () => this.calculate()
                    );
                    break;
                }
        }
    }

    setWeight = (w,u) => {
        switch (u) {
            case 'oz':
                return Number(w/this.oz);
            case 'lb':
                return Number(w/this.lb);
            case 'kg':
                return Number(w/this.kg);
            default:
                return Number(w);

        }
    }

    updateDSTotalWeight = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            total += Number(i.weight);
        }
        this.setState({totalWeight: total}, () => this.updateDSBallWeight());
    }

    updateDSBallWeight = () => {
        const { totalWeight } = this.state;
        const { numOfDoughBalls } = this.state.options;
        if (numOfDoughBalls.value !== 0) {
            return this.setState({ballWeight: Number(totalWeight / numOfDoughBalls.value)});
        }
        return this.setState({ballWeight: 0});
    }

    updateDSTotalPercent = () => {
        this.setState({totalPercent: this.getTotalPercent()});
    }

    updateDSTotalFlour = () => {
        this.setState({totalFlour: this.getTotalFlourPercent()});
    }

    updateDSHydration = () => {
        const hydration = this.getTotalFlourPercent() !== 0 ? this.getTotalWaterPercent() / this.getTotalFlourPercent() * 100 : this.getTotalWaterPercent();
        this.setState({hydration: hydration});
    }

    updateDoughStats = () => {
        this.updateDSTotalWeight();
        this.updateDSTotalPercent();
        this.updateDSTotalFlour();
        this.updateDSHydration();
    }

    calculate = () => {
        const { numOfDoughBalls, bowlResiduePercent, ballWeight, displayUnits } = this.state.options;
        const totalWeight = (ballWeight.value * numOfDoughBalls.value) * (1 + bowlResiduePercent.value / 100); // ball weight * num balls * residue
        const assumedFlourWeight = (totalWeight * 100) / this.getTotalPercent();

        this.setState(prevState => ({
            ingredients: prevState.ingredients.map(ingredient =>
                ({...ingredient,
                    "weight": this.getTotalPercent() >= 100 ?
                        this.setWeight(ingredient.percent / 100 * assumedFlourWeight, displayUnits.value)
                        : this.setWeight(ingredient.percent / 100 * totalWeight, displayUnits.value)})
            )
        }), () => this.updateDoughStats());
    }

    // returns total flour as percent
    // if != 100 then the formula contains errors
    getTotalFlourPercent = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            switch(i.type) {
                case "flour":
                    total += Number(i.percent);
                    break;
                case "starter":
                    let starterWater = Number(i.hydration) / 2 * (Number(i.percent) / 100);
                    let starterFlour = Number(i.percent) - starterWater;
                    total += starterFlour;
                    break;
                default:
                    break;
            }
        }
        return Number(total.toFixed(this.state.options.precision.value));
    }

    // returns total water as percent
    getTotalWaterPercent = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            switch(i.type) {
                case "none":
                case "liquid":
                    total += (Number(i.hydration) * Number(i.percent)) / 100;
                    break;
                case "starter":
                    total += (Number(i.hydration) / 2 * Number(i.percent)) / 100;
                    break;
                default:
                    break;
            }
        }
        return Number(total.toFixed(this.state.options.precision.value));
    }

    // returns total percent based on ingredient percentages
    getTotalPercent = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            total += Number(i.percent);
        }
        return Number(total.toFixed(this.state.options.precision.value));
    }

    toggleMenuClick = () => {
        this.setState((prevState) => ({
            optionsVisible: !prevState.optionsVisible
        }));
    }

    notesBtnClick = () => {
        console.log('notesBtnClick');
    }

    saveBtnClick = () => {
        console.log('saveBtnClick');
    }

    render() {
        const { totalWeight, ballWeight, totalPercent, totalFlour, hydration, ingredients, options, optionsVisible } = this.state;
        const precision = this.state.options.precision.value;
        const displayUnits = this.state.options.displayUnits.value;
        return (
            <div className={"App"}>
                <Header
                    onMenuBtnClick={this.toggleMenuClick}
                    onNotesBtnClick={this.notesBtnClick}
                    onSaveBtnClick={this.saveBtnClick}
                />
                <OptionsMenu
                    options={options}
                    visible={optionsVisible}
                    onMenuBtnClick={this.toggleMenuClick}
                    onOptionChange={this.updateOption}
                />
                <DoughStatsList
                    data={{totalWeight, ballWeight, totalPercent, totalFlour, hydration}}
                    units={displayUnits}
                    precision={precision}
                />
                <IngredientList
                    ingredients={ingredients}
                    units={displayUnits}
                    handleNameUpdate={this.handleNameUpdate}
                    handlePercentUpdate={this.handlePercentUpdate}
                    handleTypeUpdate={this.handleTypeUpdate}
                    handleHydrationUpdate={this.handleHydrationUpdate}
                    handleRemoveIngredient={this.handleRemoveIngredient}
                    precision={precision}
                />
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;