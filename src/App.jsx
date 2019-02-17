"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

import Header from "./components/Header.jsx";
import AddForm from "./components/AddForm.jsx";
import PlansSection from "./components/PlansSection.jsx";
import Footer from "./components/Footer.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        const days = this.setDaysFromStorage();
        const setC = this.setCounter(days);
        this.state = {
            openAddFormClicked: false,

            // properties for taskObjToAdd
            id: 0,
            taskName: "",
            taskPriority: 0,
            estimatedTime: 0,
            selected: false,

            // where to add
            dayIndex: 0,

            days: days,
            // JSON.parse(localStorage.getItem("days")) || [
            //         [// day 0
            //         //     { // single task
            //         //         id: 0,
            //         //         taskName: "taskName",
            //         //         taskPriority: "3",
            //         //         estimatedTime: "4",
            //         //         selected: false,
            //         //     }
            //         ],
            //         [], // day 2
            //         [],
            //         [],
            //         [],
            //         [],
            //         [] // day 6
            //     ],
            depot: [], // id of tasks to move

            idCounter: setC
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);// this.state?
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.saveTaskListToLocalStorage = this.saveTaskListToLocalStorage.bind(this);
        this.clearLocalStorage = this.clearLocalStorage.bind(this);

    };

    setDaysFromStorage() {
        const daysFromStorageOrTemplate = JSON.parse(localStorage.getItem("days")) || [
            [// day 0
                //     { // single task
                //         id: 0,
                //         taskName: "taskName",
                //         taskPriority: "3",
                //         estimatedTime: "4",
                //         selected: false,
                //     }
            ],
            [], // day 2
            [],
            [],
            [],
            [],
            [] // day 6
        ];

        return daysFromStorageOrTemplate;
    }

    setCounter = (days) => {
        console.log(days);
        let currentlyBiggest;
        // if (days[0].length === 0 &&
        //     days[1].length === 0 &&
        //     days[2].length === 0 &&
        //     days[3].length === 0 &&
        //     days[4].length === 0 &&
        //     days[5].length === 0 &&
        //     days[6].length === 0) {
        //         currentlyBiggest = 0;
        //     }
        if (days.every( day => day.length)) {
            currentlyBiggest = 0;
        }
        else {
            currentlyBiggest = JSON.parse(localStorage.getItem("idCount")) || 0;
            for (let i = 0; i < days.length; i++) {
                for (let k = 0; k < days[i].length; k++) {
                    days[i][k].id > currentlyBiggest ? currentlyBiggest = days[i][k].id : currentlyBiggest;
                }
            }
        }
        return currentlyBiggest;
    };

    handleClick(event) {
        //const {name, value} = event.target;
        event.preventDefault();
        this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
        //console.log(this.state.openAddFormClicked);
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };


    removeSelected() {
        // console.log("removing selected");
        this.setState( prevState => {
            let newDays = [...prevState.days];
            newDays = newDays.map( day => {
                let newD = day.filter( task => task.selected != true);
                return newD;
            });
            // console.log("REM newDays ", newDays);
            return ({
                days: newDays
            })
            }
        );
    }

    // to co niżej
    // handleDelete = (a) => {
    //     return (b) => {
    //
    //     }
    // };

    handleDelete = day => toDel =>  {
        this.setState( prevState => {
            let newDays = [...prevState.days];
            // console.log(`Skasuj zadanie o id ${toDel} w dniu ${day}, możliwe dni ${newDays}`);
            // console.log("Nasz------", newDays[day], newDays, day, event.target);

            // days[day].filter( item => !toDel.includes(item.id) );
            newDays[day] = newDays[day].filter( item => item.id != toDel );
            // console.log("NEW days ", newDays);
            // filter(item => !toDel.includes(item.id));

            return ({
                days: newDays
            })
        });
    };

    handleSelected = day => toPush => {
        // console.log("Zaznaczone");

        this.setState( prevState => {
            let toAction = [...prevState.days];
            let selectedTask = toAction[day].find( item => item.id == toPush );
            //console.warn("===== Selected to action before =====", selectedTask, toAction, day, event.target);
            selectedTask.selected === true ? selectedTask.selected = false : selectedTask.selected = true;
            //console.warn("===== Selected to action after=====", selectedTask);

            //----New--setting--task--to--selected----
            let newDays = toAction.map( day => {
                //console.log("DAY:", day);
                let y = day.map( item => {
                    //console.log("ITEM:", item.id, selectedTask.id);
                    if (item.id === selectedTask.id) {
                        //console.log("Warunek:", item);

                        return selectedTask;
                    }
                    return item;
                });
                return y;
            });
            //console.log("toAction po map", x);
            //---------------------

            return ({
                days: newDays
            })
        });
    };

    // onEdit = day => toEdit => {
    //     console.log("Zedytowano");
    //     this.setState( prevState => {
    //         let daysToAction = [...prevState.days];
    //         let taskToEdit = daysToAction[day].find( item => item.id == toEditPush );
    //
    //         let newDays = daysToAction.map( day => {
    //             //console.log("DAY:", day);
    //             let newItem = day.map( item => {
    //                 //console.log("ITEM:", item.id, selectedTask.id);
    //                 if (item.id === taskToEdit.id) {
    //                     //console.log("Warunek:", item);
    //
    //                     return taskToEdit;
    //                 }
    //                 return item;
    //             });
    //             return newItem;
    //         });
    //
    //         return ({
    //             days: newDays
    //         })
    //     });
    // };


    handleSubmit = (event) => {
        event.preventDefault();

        this.setState( prevState => {
            console.warn(prevState);
            const newDays = [...prevState.days];
            const currentId = prevState.idCounter;

            // -!!-> tworzymy wiele zmiennych, którym przypsiujemy wartości z obiektu
            // leżące pod kluczami analogicznymi do nazwy zmiennej
            const { idCounter: id, taskName, taskPriority, estimatedTime, selected } = prevState;
            // zapis równoważny:
            // const taskName = prevState.taskName;
            // const taskPriority = prevState.taskPriority;
            // const estimatedTime = prevState.estimatedTime;

            // -!!-> tworzymy nowy obiekt currentDay, w którym przypisujemy kluczom
            // wartości zmiennych o takich samych nazwach jak klucze
            const currentDay = { id, taskName, taskPriority, estimatedTime, selected };
            // zapis równoważyny:
            // currentDay = {
            //     taskName: taskName,
            //     taskPriority: taskPriority
            //     estimatedTime: estimatedTime
            // }

            // console.error("Obiekt do dodania currentDay ", currentDay);
            newDays[prevState.dayIndex].push(currentDay);

            return ({
                days: newDays,
                idCounter: currentId + 1
            })
        });
        this.state.openAddFormClicked ? this.setState({openAddFormClicked: false}) : this.setState({openAddFormClicked: true});
    };

    moveTask = (backward) => { // backward === true
        // console.log("go to day before");
        this.setState( prevState => {
                let newDays = [...prevState.days];
                backward ? newDays.reverse() : newDays;
                // console.log("REVERSED", newDays);
                let toMoveTab = [];
                newDays = newDays.map( (day, index) => {
                    // console.log("iNDEx ", index);
                    if (index < 6) {
                        let newDay = day.filter( task => task.selected != true );
                        newDay = [...newDay, ...toMoveTab];

                        let toMove = day.filter( task => task.selected == true );
                        // console.log("toMove", toMove);
                        toMoveTab = [...toMove];
                        toMove.forEach( task => task.selected = false );
                        // console.log("ND ", newDay);
                        return newDay;
                    } else if (index === 6 ) {
                        const newDay = [...day, ...toMoveTab];
                        newDay.forEach( task => task.selected = false );
                        // console.log("ND ", newDay);
                        return newDay;
                    }


                });
                // console.log("Moving tasks newDays ", newDays);
                backward ? newDays.reverse() : newDays;
                return ({
                    days: newDays
                })
            }
        );
    };

    clearLocalStorage() {
        localStorage.clear();
    };

    saveTaskListToLocalStorage() {
        this.clearLocalStorage();
        localStorage.setItem("days", JSON.stringify(this.state.days));
        localStorage.setItem("idCount", JSON.stringify(this.state.idCounter));
    };


    render() {
        // console.log("-Days-", this.state.days);
        // console.log("-Depot-", this.state.depot);

        return (
            <div onKeyDown={this.handleT}>
                <Header
                    handleClick={this.handleClick}
                    data={this.state}
                />
                {this.state.openAddFormClicked ? <AddForm
                    days={this.state.days}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    id={this.state.id}
                    taskName={this.state.taskName}
                    taskPriority={this.state.taskPriority}
                    dayIndex={this.state.dayIndex}
                    estimatedTime={this.state.estimatedTime}
                /> : <PlansSection
                    days={this.state.days}
                    handleDelete={this.handleDelete}
                    handleSelected={this.handleSelected}
                    onEdit={this.onEdit}
                />}
                <Footer
                    removeSelected={this.removeSelected}
                    moveForward={this.moveForward}
                    moveBackward={this.moveBackward}
                    moveTask={this.moveTask}
                    save={this.saveTaskListToLocalStorage}
                />
            </div>
        )
    }
}

//--------------components rendering--------------
document.addEventListener('DOMContentLoaded',
    function(){
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );
    }
);




// handleSelected2 = day => toPush => {
//     console.log("Zaznaczone");
//
//     this.setState( prevState => {
//         let toDepot = prevState.days;
//         toDepot = toDepot[day].filter( item => item.id == toPush );
//         console.warn("Selected to depot------ /n ::::", toDepot[day], toDepot, day, event.target);
//
//         //----New--setting--task--to--selected----
//         toDepot.map( item => {
//             item.selected === true ? item.selected = false : item.selected = true;
//         });
//         //---------------------
//
//         return ({
//              depot: [...prevState.depot, ...toDepot]
//         })
//     });
// };
