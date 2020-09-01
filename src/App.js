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
                    data: ['baker\'s percentage', 'thickness factor', 'reverse'],
                    visible: true,
                    position: 5
                },
                ballWeight: {
                    label: 'ball weight',
                    value: 360,
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
            percent: '',
            type: 'none',
            hydration: '',
            weight: '',
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]}, () => console.log("Ingredient added"));
    }

    updateIngredient = (id, key, val) => {
        switch(key) {
            case 'percent':
            case 'weight': // nothing technically changes weight, yet..
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: Number(val) } : ingredient
                    ),
                }), () => this.updateTotalPercent());
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ({ ...ingredient, "weight": Number(val) }))}));
                break;
            case 'hydration':
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: Number(val) } : ingredient
                    ),
                }), () => this.updateHydration());
                break;
            case 'type':
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: val } : ingredient
                    ),
                }), () => this.updateHydration());
                break;
            default:
                this.setState(prevState => ({
                    ingredients: prevState.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: val } : ingredient
                    ),
                }), () => this.updateTotalPercent());
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
                    })
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
                    })
                );
                break;
        }
    }

    updateTotalWeight = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            total += Number(i.weight);
        }
        this.setState({totalWeight: total});
    }

    updateBallWeight = () => {
        this.setState({ballWeight: this.state.options.ballWeight * (1 + this.state.options.bowlResiduePercent/100)});
    }

    updateTotalPercent = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            total += Number(i.percent);
        }
        this.setState({totalPercent: Number(total.toFixed(this.state.options.precision.value))});
    }

    updateHydration = () => {
        console.log(this.getTotalFlour());
        this.setState({hydration: this.getTotalWater()});
    }

    // returns total flour as percent
    getTotalFlour = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            console.log(i.type)
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
        return total;
    }

    // returns total water as percent
    getTotalWater = () => {
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

    updateAll = () => {
        this.updateTotalWeight();
        this.updateBallWeight();
        this.updateTotalPercent();
        this.updateHydration();
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
        const { totalWeight, ballWeight, totalPercent, hydration, ingredients, options, optionsVisible } = this.state;
        const displayUnits = this.state.options.displayUnits.value;
        return (
            <div className={"App"}>
                <Header onMenuBtnClick={this.toggleMenuClick} onNotesBtnClick={this.notesBtnClick} onSaveBtnClick={this.saveBtnClick} />
                <OptionsMenu options={options} visible={optionsVisible} onMenuBtnClick={this.toggleMenuClick} onOptionChange={this.updateOption} />
                <div className={"formula-container"}>
                    <DoughStats data={{totalWeight, ballWeight, totalPercent, hydration}} units={displayUnits} />
                    <IngredientList ingredients={ingredients} units={displayUnits} onUpdateIngredient={this.updateIngredient} />
                </div>
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;