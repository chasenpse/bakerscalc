import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header/Header';
import OptionsMenu from "./OptionsMenu/OptionsMenu";
import DoughStatsList from './DoughStatsList/DoughStatsList';
import IngredientList from "./IngredientList/IngredientList";
import CreateDate from "./CreateDate/CreateDate";
import AddBtn from "./AddBtn/AddBtn";
import {setWeight} from "../utils/setWeight";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            createDate: null,
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
                    value: "baker's percentage",
                    group: 'global',
                    type: 'select',
                    data: ["baker's percentage", "thickness factor"],
                    position: 5
                },
                ballWeight: {
                    label: 'ball weight',
                    value: 453.59,
                    group: "baker's percentage",
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
                    subgroup: 'circular',
                    type: 'input',
                    position: 9
                },
                panLength: {
                    label: 'pan length',
                    value: 9,
                    group: 'thickness factor',
                    subgroup: 'rectangular',
                    type: 'input',
                    position: 10
                },
                panWidth: {
                    label: 'pan width',
                    value: 13,
                    group: 'thickness factor',
                    subgroup: 'rectangular',
                    type: 'input',
                    position: 11
                }
            },
            loading: false,
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            this.setState({loading: true});
            try {
                const result = await axios.get(`${process.env.REACT_APP_BC_API}/${id}`);
                if (result.data) {
                    this.setState(prevState => ({
                        title: result.data.title,
                        createDate: result.data.createDate,
                        options: {...prevState.options,
                            numOfDoughBalls: {...prevState.options.numOfDoughBalls, value:result.data.numOfDoughBalls},
                            displayUnits: {...prevState.options.displayUnits, value:result.data.displayUnits},
                            bowlResiduePercent: {...prevState.options.bowlResiduePercent, value:result.data.bowlResiduePercent},
                            precision: {...prevState.options.precision, value:result.data.precision},
                            calcMode: {...prevState.options.calcMode, value:result.data.calcMode},
                            ballWeight: {...prevState.options.ballWeight, value:result.data.ballWeight},
                            thicknessFactor: {...prevState.options.thicknessFactor, value:result.data.thicknessFactor},
                            panShape: {...prevState.options.panShape, value:result.data.panShape},
                            panDiameter: {...prevState.options.panDiameter, value:result.data.panDiameter},
                            panLength: {...prevState.options.panLength, value:result.data.panLength},
                            panWidth: {...prevState.options.panWidth, value:result.data.panWidth}},
                        ingredients: result.data.ingredients,
                        loading: false,
                    }), this.calcWeight)
                }
            } catch (e) {
                this.setState({loading: false});
            }
        }
    }

    saveBtnClick = async () => {
        const data = {
            title: this.state.title,
            numOfDoughBalls: this.state.options.numOfDoughBalls.value,
            displayUnits: this.state.options.displayUnits.value,
            bowlResiduePercent: this.state.options.bowlResiduePercent.value,
            precision: this.state.options.precision.value,
            calcMode: this.state.options.calcMode.value,
            ballWeight: this.state.options.ballWeight.value,
            thicknessFactor: this.state.options.thicknessFactor.value,
            panShape: this.state.options.panShape.value,
            panDiameter: this.state.options.panDiameter.value,
            panLength: this.state.options.panLength.value,
            panWidth: this.state.options.panWidth.value,
            ingredients: this.state.ingredients,
        };
        try {
            const result = await axios.post(`${process.env.REACT_APP_BC_API}`, {...data});
            this.props.history.push(`/${result.data.id}`);
        } catch (e) {
            console.log(e);
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

    handleTitleUpdate = (val) => this.setState({title: val});

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
                i === id ? { ...ingredient, percent: Number(val) } : ingredient
            ),
        }), () => this.calcWeight());
    }

    handleTypeUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, type: val } : ingredient
            ),
        }), () => this.calcWeight());
    }

    handleHydrationUpdate = (id,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((ingredient, i) =>
                i === id ? { ...ingredient, hydration: Number(val) } : ingredient
            ),
        }), () => this.calcWeight());
    }

    handleRemoveIngredient = (id) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter((ingredient, i)=>i!==id)
        }), () => this.calcWeight());
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
                    }), () => this.calcWeight()
                );
                break;
            default:
                if (id === "displayUnits") {
                    this.setState(
                        prevState => ({
                            options: {
                                ...prevState.options, [id]: {
                                    ...prevState.options[id], value: val
                                }
                            }
                        }), () => this.calcWeight()
                    );
                } else {
                    this.setState(
                        prevState => ({
                            options: {
                                ...prevState.options, [id]: {
                                    ...prevState.options[id], value: val
                                }
                            }
                        }), () => this.calcWeight()
                    );
                }
                break;
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
        this.setState({hydration: this.getHydration()});
    }

    updateDoughStats = () => {
        this.updateDSTotalWeight();
        this.updateDSTotalPercent();
        this.updateDSTotalFlour();
        this.updateDSHydration();
    }

    // returns total flour as percent if != 100 then the formula contains errors
    getTotalFlourPercent = () => {
        return this.state.ingredients.reduce((total, i) => {
            switch(i.type) {
                case "flour":
                    total += i.percent;
                    break;
                case "starter":
                    let starterWater = i.hydration / 2 * (i.percent / 100);
                    let starterFlour = i.percent - starterWater;
                    total += starterFlour;
                    break;
                default:
                    break;
            }
            return total;
        },0);
    }

    // returns total water as percent
    getTotalWaterPercent = () => {
        return this.state.ingredients.reduce((total,i) => {
            switch(i.type) {
                case "none":
                case "liquid":
                    total += (i.hydration * i.percent) / 100;
                    break;
                case "starter":
                    total += (i.hydration / 2 * i.percent) / 100;
                    break;
                default:
                    break;
            }
            return total;
        },0);
    }

    // returns total percent based on ingredient percentages
    getTotalPercent = () => this.state.ingredients.reduce((acc,curr) => acc += Number(curr.percent),0);

    getHydration = () => this.getTotalFlourPercent() !== 0 ? this.getTotalWaterPercent() / this.getTotalFlourPercent() * 100 : this.getTotalWaterPercent();

    getThicknessFactorWeight = () => {
        // thicknessFactorWeight(oz) = area * thicknessFactor
        const panShape = this.state.options.panShape.value;
        const tf = this.state.options.thicknessFactor.value;
        const area = panShape === "circular" ?
            Math.PI * ((this.state.options.panDiameter.value / 2)**2) :
            this.state.options.panLength.value * this.state.options.panWidth.value;
        return setWeight('oz',this.state.options.displayUnits.value,area * tf);
    }

    calcWeight = () => {
        const { numOfDoughBalls, bowlResiduePercent, ballWeight } = this.state.options;
        const tmp = this.state.options.calcMode.value === "baker's percentage" ? ballWeight.value : this.getThicknessFactorWeight(); // check calc mode
        const totalWeight = (tmp * numOfDoughBalls.value) * (1 + bowlResiduePercent.value / 100); // (ball weight * num balls) * residue
        const assumedFlourWeight = (totalWeight * 100) / this.getTotalPercent(); // used when totalPercent < 100

        this.setState(prevState => ({
            ingredients: prevState.ingredients.map(ingredient =>
                ({...ingredient,
                    "weight": this.getTotalPercent() >= 100 ? ingredient.percent / 100 * assumedFlourWeight : ingredient.percent / 100 * totalWeight})
            )
        }), () => this.updateDoughStats());
    }

    toggleMenuClick = () => {
        this.setState((prevState) => ({
            optionsVisible: !prevState.optionsVisible
        }));
    }

    render() {
        const { totalWeight, ballWeight, totalPercent, totalFlour, hydration, ingredients, options, optionsVisible, title, createDate, loading } = this.state;
        if (loading) {
            return <div className={"loading"}>Loading formula...</div>
        }
        const precision = this.state.options.precision.value;
        const displayUnits = this.state.options.displayUnits.value;
        return (
            <div className={"App"}>
                <Header
                    onMenuBtnClick={this.toggleMenuClick}
                    onSaveBtnClick={this.saveBtnClick}
                    title={title}
                    handleTitleUpdate={this.handleTitleUpdate}
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
                <CreateDate date={createDate} />
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;