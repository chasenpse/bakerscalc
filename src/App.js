import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import DoughStats from './components/DoughStats/DoughStats';
import IngredientList from "./components/IngredientList/IngredientList";
import AddBtn from "./components/AddBtn/AddBtn";

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
            options: {
                calcMode: 'bakerpercentage',
                numOfDoughBalls: 1,
                ballWeight: 0,
                displayUnits: 'g',
                bowlResiduePercent: 0,
                precision: 2,
                thicknessFactor: 0.1,
                panShape: "circular",
                panDiameter: 0,
                panLength: 0,
                panWidth: 0,
            }
        }
    }

    onAddIngredient = () => {
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

    onUpdateIngredient = (id, key, val) => {
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

    render() {
        const {doughStats, ingredients} = this.state;
        const {displayUnits} = this.state.options;
        return (
            <div className={"App"}>
                <Header />
                <div className={"formula-container"}>
                    <DoughStats data={doughStats} units={displayUnits} />
                    <IngredientList ingredients={ingredients} units={displayUnits} updateIngredient={this.onUpdateIngredient} />
                </div>
                <AddBtn addIngredient={this.onAddIngredient} />
            </div>
        );
    }
}

export default App;