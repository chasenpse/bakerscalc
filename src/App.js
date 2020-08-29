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
            options: [
                {
                    id: 'numOfDoughBalls',
                    label: '# of balls',
                    value: 1,
                    group: 'global',
                    type: 'input',
                    visible: true
                },
                {
                    id: 'displayUnits',
                    label: 'display units',
                    value: 'g',
                    group: 'global',
                    type: 'select',
                    data: ['g', 'oz', 'lb', 'kg'],
                    visible: true
                },
                {
                    id: 'bowlResiduePercent',
                    label: 'bowl residue percent',
                    value: 0,
                    group: 'global',
                    type: 'input',
                    visible: true
                },
                {
                    id: 'precision',
                    label: 'precision',
                    value: 2,
                    group: 'global',
                    type: 'input',
                    visible: true
                },
                {
                    id: 'calcMode',
                    label: 'calc mode',
                    value: 'baker\'s percentage',
                    group: 'global',
                    type: 'select',
                    data: ['baker\'s percentage', 'thickness factor', 'reverse'],
                    visible: true
                },
                {
                    id: 'ballWeight',
                    label: 'ball weight',
                    value: 360,
                    group: 'doughWeight',
                    type: 'input',
                    visible: true
                },
                {
                    id: 'thicknessFactor',
                    label: 'thickness factor',
                    value: 0.1,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false
                },
                {
                    id: 'panShape',
                    label: 'pan shape',
                    value: 'circular',
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false
                },
                {
                    id: 'panDiameter',
                    label: 'pan diameter',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false
                },
                {
                    id: 'panLength',
                    label: 'pan length',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false
                },
                {
                    id: 'panWidth',
                    label: 'pan width',
                    value: 0,
                    group: 'thicknessFactor',
                    type: 'input',
                    visible: false
                }
            ]
        }
    }

    addIngredient = () => {
        const ingredient = {
            id: this.state.ingredients.length,
            name: '',
            percent: '0',
            type: '',
            hydration: '0',
            weight: '',
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]}, () => console.log("Ingredient added"));
    }

    updateIngredient = (id, key, val) => {
        switch(key) {
            case 'percent':
            case 'hydration':
            case 'weight': // nothing technically changes weight, yet..
                this.setState(state => ({
                    ingredients: state.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: Number(val) } : ingredient
                    ),
                }), () => { this.updateTotalPercent() });
                break;
            default:
                this.setState(state => ({
                    ingredients: state.ingredients.map(ingredient =>
                        ingredient.id === id ? { ...ingredient, [key]: val } : ingredient
                    ),
                }), () => { this.updateTotalPercent() });
                break;
        }
    };

    updateOption = (id, type, val) => {
        switch(type) {
            case 'input':
                this.setState(state => ({
                    options: state.options.map((option) =>
                        option["id"] === id ? { ...option, 'value': Number(val) } : option
                    ),
                }));
                break;
            default:
                this.setState(state => ({
                    options: state.options.map((option) =>
                        option["id"] === id ? { ...option, 'value': val } : option
                    ),
                }));
                break;
        }
    }

    updateTotalPercent = () => {
        let total = 0;
        for (let i of this.state.ingredients) {
            total += i.percent;
        }
        this.setState({
            totalPercent: Number(total)
        });
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
        const {totalWeight, ballWeight, totalPercent, hydration, ingredients, options, optionsVisible} = this.state;
        const displayUnits = this.state.options[1].value;
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