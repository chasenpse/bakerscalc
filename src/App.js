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
            doughStats: {
                totalWeight: 0,
                ballWeight: 0,
                totalPercent: 0,
                hydration: 0,
            },
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
                    value: 4,
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
            percent: '',
            type: '',
            hydration: '',
            weight: '',
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]}, () => console.log(this.state));
    }

    updateIngredient = (id, key, val) => {
        switch(key) {
            case 'percent':
            case 'hydration':
            case 'weight':
                this.setState((prevState) => ({
                    ingredients: prevState.ingredients.map((ingredient) =>
                        ingredient.id === id ? { ...ingredient, [key]: Number(val) } : ingredient
                    ),
                }), () => { console.log(this.state)});
                break;
            default:
                this.setState((prevState) => ({
                    ingredients: prevState.ingredients.map((ingredient) =>
                        ingredient.id === id ? { ...ingredient, [key]: val } : ingredient
                    ),
                }), () => { console.log(this.state)});
                break;
        }
    };

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

    calc = () => {

    }

    componentDidMount() {
        console.log(this.state.options.map(option => {
            return option.id === "displayUnits" ? option.value : null
        }));
        console.log();
    }

    render() {
        const {doughStats, ingredients, options, optionsVisible} = this.state;
        const displayUnits = this.state.options[1].value;
        return (
            <div className={"App"}>
                <Header onMenuBtnClick={this.toggleMenuClick} onNotesBtnClick={this.notesBtnClick} onSaveBtnClick={this.saveBtnClick} />
                <OptionsMenu options={options} visible={optionsVisible} onMenuBtnClick={this.toggleMenuClick} />
                <div className={"formula-container"}>
                    <DoughStats data={doughStats} units={displayUnits} />
                    <IngredientList ingredients={ingredients} units={displayUnits} onUpdateIngredient={this.updateIngredient} />
                </div>
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;