import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DoughStats from './components/DoughStats/DoughStats';
import IngredientList from "./components/IngredientList/IngredientList";
import AddBtn from "./components/AddBtn/AddBtn";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu";

class App extends Component {
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
                    visible: true,
                    position: 1
                },
                displayUnits: {
                    label: 'display units',
                    value: 'g',
                    group: 'global',
                    type: 'select',
                    data: ['g', 'oz', 'lb', 'kg'],
                    visible: true,
                    position: 2
                },
                bowlResiduePercent: {
                    label: 'bowl residue percent',
                    value: 0,
                    group: 'global',
                    type: 'input',
                    visible: true,
                    position: 3
                },
                precision: {
                    label: 'precision',
                    value: 2,
                    group: 'global',
                    type: 'input',
                    visible: true,
                    position: 4
                },
                calcMode: {
                    label: 'calc mode',
                    value: 'baker\'s percentage',
                    group: 'global',
                    type: 'select',
                    data: ['baker\'s percentage', 'thickness factor'],
                    visible: true,
                    position: 5
                },
                ballWeight: {
                    label: 'ball weight',
                    value: 453.59,
                    group: 'doughWeight',
                    type: 'input',
                    visible: true,
                    position: 6
                },
                thicknessFactor: {
                    label: 'thickness factor',
                    value: 0.1,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false,
                    position: 7
                },
                panShape: {
                    label: 'pan shape',
                    value: 'circular',
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false,
                    position: 8
                },
                panDiameter: {
                    label: 'pan diameter',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false,
                    position: 9
                },
                panLength: {
                    label: 'pan length',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false,
                    position: 10
                },
                panWidth: {
                    label: 'pan width',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false,
                    position: 11
                }
            }
        }
    }

    addIngredient = () => {
        const ingredient = {
            id: this.state.ingredients.length,
            name: '',
            percent: 0,
            type: 'none',
            hydration: 0,
            weight: 0,
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]});
    }

    updateIngredient = (id, name, val) => {
        switch(name) {
            case 'name':
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [name]: val } : ingredient
                    ),
                }));
                break;
            case 'percent':
            case 'hydration':
            case 'weight': // nothing technically changes weight, yet..
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [name]: Number(val) } : ingredient
                    ),
                }), () => this.calculate());
                break;
            case 'type':
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient => {
                        switch (val) {
                            case 'n/a':
                                return ingredient.id === id ? { ...ingredient, [name]: val } : ingredient;
                            case 'flour':
                                return ingredient.id === id ? { ...ingredient, [name]: val, 'hydration': 0 } : ingredient;
                            case 'liquid':
                            case 'starter':
                                return ingredient.id === id ? { ...ingredient, [name]: val, 'hydration': 100 } : ingredient;
                            default:
                                return ingredient.id === id ? { ...ingredient, [name]: val } : ingredient;
                        }
                    }),
                }), () => this.calculate());
                break;
            default:
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [name]: val } : ingredient
                    ),
                }));
                break;
        }
    };

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

    setWeight = (w,u) => {
        const oz = 28.349523125;
        const lb = 453.59237;
        const kg = 1000;
        switch (u) {
            case 'oz':
                return Number(w/oz);
            case 'lb':
                return Number(w/lb);
            case 'kg':
                return Number(w/kg);
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
        this.setState({ballWeight: Number(totalWeight / numOfDoughBalls.value)});
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
                ({...ingredient, "weight": this.getTotalPercent() >= 100 ? this.setWeight(ingredient.percent / 100 * assumedFlourWeight, displayUnits.value) : this.setWeight(ingredient.percent / 100 * totalWeight, displayUnits.value)})
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
                <Header onMenuBtnClick={this.toggleMenuClick} onNotesBtnClick={this.notesBtnClick} onSaveBtnClick={this.saveBtnClick} />
                <OptionsMenu options={options} visible={optionsVisible} onMenuBtnClick={this.toggleMenuClick} onOptionChange={this.updateOption} />
                <div className={"formula-container"}>
                    <DoughStats data={{totalWeight, ballWeight, totalPercent, totalFlour, hydration}} units={displayUnits} precision={precision} />
                    <IngredientList ingredients={ingredients} units={displayUnits} onUpdateIngredient={this.updateIngredient} precision={precision}/>
                </div>
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;