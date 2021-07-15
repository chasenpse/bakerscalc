import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './App.css';
import Header from './Header/Header';
import OptionsMenu from "./OptionsMenu/OptionsMenu";
import DoughStatsList from './DoughStatsList/DoughStatsList';
import IngredientList from "./IngredientList/IngredientList";
import CreateDate from "./CreateDate/CreateDate";
import AddBtn from "./AddBtn/AddBtn";
import {setWeight} from "../utils/setWeight";
import Loader from "./Loader/Loader";
import ShareMenu from "./ShareMenu/ShareMenu";

class App extends Component {

    state = {
        formulaId: null,
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
                position: 1,
                tooltip: [
                    "Set the number of dough balls the final dough will be divided into"
                ],
            },
            displayUnits: {
                label: 'display units',
                value: 'g',
                group: 'global',
                type: 'select',
                data: ['g', 'oz', 'lb', 'kg'],
                position: 2,
                tooltip: [
                    "Set the displayed units of measurement for ingredients and dough weights"
                ],
            },
            bowlResiduePercent: {
                label: 'bowl residue percent',
                value: 0,
                group: 'global',
                type: 'input',
                step: 0.01,
                position: 3,
                tooltip: [
                    "Set an additional percent based on the total dough weight to compensate for dough left in " +
                    "the bowl",

                    "For example a recipe with a total weight of 1000g and 1% bowl residue will ultimately weigh " +
                    "1010g, since each ingredient includes an additional 1%"
                ],
            },
            precision: {
                label: 'precision',
                value: 2,
                group: 'global',
                type: 'input',
                position: 4,
                tooltip: [
                    "Sets the number of decimal places",

                    "0=Whole numbers, 1=tenths, 2=hundredths, etc."
                ],
            },
            calcMode: {
                label: 'calc mode',
                value: "baker's percentage",
                group: 'global',
                type: 'select',
                data: ["baker's percentage", "thickness factor"],
                position: 5,
                tooltip: [
                    "Baker's percentage is a weight based system used to scale dough recipes, where total flour " +
                    "is always represented as 100% and each ingredient is a percentage based off of that weight. For " +
                    "example if total flour is 1000g and calls for 60% water, the water weight would equal 600g.",

                    "Thickness factor is a decimal value representing the dough weight per square inch of surface " +
                    "area and is commonly used with pizza doughs. Typical values range from 0.8 - 0.13, going from " +
                    "thin to thick, respectively.",
                ],
            },
            ballWeight: {
                label: 'ball weight',
                value: 453.59,
                group: "baker's percentage",
                type: 'input',
                step: 0.01,
                position: 6,
                tooltip: [
                    "Set the desired individual ball weight represented in the display units above"
                ],
            },
            thicknessFactor: {
                label: 'thickness factor',
                value: 0.1,
                group: 'thickness factor',
                type: 'input',
                step: 0.001,
                position: 7,
                tooltip: [
                    "Thickness factor is a decimal value representing the dough weight per square inch of surface " +
                    "area and is commonly used with pizza doughs. Typical values range from 0.8 - 0.13, going from " +
                    "thin to thick, respectively."
                ],
            },
            panShape: {
                label: 'pan shape',
                value: 'circular',
                group: 'thickness factor',
                type: 'select',
                data: ['circular', 'rectangular'],
                position: 8,
                tooltip: [
                    "Set the shape of your pan or pizza stone"
                ],
            },
            panDiameter: {
                label: 'pan diameter',
                value: 14,
                group: 'thickness factor',
                subgroup: 'circular',
                type: 'input',
                position: 9,
                tooltip: [
                    "Set the diameter of your pan or pizza stone"
                ],
            },
            panLength: {
                label: 'pan length',
                value: 9,
                group: 'thickness factor',
                subgroup: 'rectangular',
                type: 'input',
                position: 10,
                tooltip: [
                    "Set the length of your pan or pizza stone"
                ],
            },
            panWidth: {
                label: 'pan width',
                value: 13,
                group: 'thickness factor',
                subgroup: 'rectangular',
                type: 'input',
                position: 11,
                tooltip: [
                    "Set the width of your pan or pizza stone"
                ],
            }
        },
        loading: false,
        shareMenu: false,
        touched: false,
        alert: false,
    }

    async componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            this.setState({loading: true});
            try {
                const result = await axios.get(`${process.env.REACT_APP_BC_API}/${id}`);
                if (result.data) {
                    this.setState({compareStr: JSON.stringify(result.data)})
                    let ingredients = result.data.ingredients.map(i=>({...i, uuid: uuidv4()}))
                    this.setState(prevState => ({
                        formulaId: result.data.id,
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
                        ingredients,
                        loading: false,
                        touched: false,
                    }), this.calcWeight)
                    document.title = `${result.data.title} - BakersCalc`
                }
            } catch (e) {
                this.setState({loading: false});
            }
        }
    }

    saveBtnClick = async () => {
        this.setState({loading:true})
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
            this.setState({createDate: result.data.createDate});
            this.setState({formulaId: result.data.id});
            this.props.history.push(`/${result.data.id}`);
            this.setState({loading:false})
            this.setState({touched:false})
        } catch (e) {
            console.log(e);
            this.setState({loading:false})
        }
    }

    shareBtnClick = () => this.setState(p=>({shareMenu: !p.shareMenu}))

    handleTitleUpdate = (val) => {
        this.setState({title: val});
        this.setState({touched:true});
    }

    handleNameUpdate = (uuid,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((i) =>
                i.uuid === uuid ? { ...i, name: val } : i
            ),
        }));
        this.setState({touched:true})
    }

    handlePercentUpdate = (uuid,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((i) =>
                i.uuid === uuid ? { ...i, percent: Number(val) } : i
            ),
        }), () => this.calcWeight());
        this.setState({touched:true})
    }

    handleTypeUpdate = (uuid,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((i) =>
                i.uuid === uuid ? { ...i, type: val } : i
            ),
        }), () => this.calcWeight());
        this.setState({touched:true})
    }

    handleHydrationUpdate = (uuid,val) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.map((i) =>
                i.uuid === uuid ? { ...i, hydration: Number(val) } : i
            ),
        }), () => this.calcWeight());
        this.setState({touched:true})
    }

    addIngredient = () => {
        const ingredient = {
            name: '',
            uuid: uuidv4(),
            percent: '',
            type: 'none',
            hydration: '',
            weight: 0,
        }
        this.setState({ingredients: [...this.state.ingredients, ingredient]});
        window.scrollBy({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        this.setState({touched:true})
    }

    handleRemoveIngredient = (uuid) => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter((ingredient)=>ingredient.uuid!==uuid)
        }), () => this.calcWeight());
        this.setState({touched:true})
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
        this.setState({touched:true})
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

    render() {
        const {
            totalWeight,
            ballWeight,
            totalPercent,
            totalFlour,
            hydration,
            ingredients,
            options,
            optionsVisible,
            title,
            createDate,
            loading,
            shareMenu,
        } = this.state;
        const precision = this.state.options.precision.value;
        const displayUnits = this.state.options.displayUnits.value;

        if (loading) {
            return <Loader />
        }

        return (
            <div className={"App"}>
                <Header
                    onMenuBtnClick={()=>{this.setState({optionsVisible: true})}}
                    onSaveBtnClick={this.saveBtnClick}
                    onShareBtnClick={this.shareBtnClick}
                    title={title}
                    handleTitleUpdate={this.handleTitleUpdate}
                />
                {
                    shareMenu ?
                    <ShareMenu
                        close={()=>{this.setState({shareMenu: false})}}
                        url={this.state.formulaId}
                        touched={this.state.touched}
                        data={this.state}
                    /> : null
                }
                {
                    optionsVisible ?
                        <OptionsMenu
                            options={options}
                            onMenuBtnClick={()=>{this.setState({optionsVisible: false})}}
                            onOptionChange={this.updateOption}
                        /> : null
                }
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
                {createDate ? <CreateDate date={createDate} /> : null}
                <AddBtn addIngredient={this.addIngredient} />
            </div>
        );
    }
}

export default App;