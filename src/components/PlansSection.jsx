import React from "react";
import Day from "./Day.jsx";


class PlansSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenSize: window.innerWidth,
        };
        this.handleLoad = this.handleLoad.bind(this);
    };

    handleLoad(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    render() {
        const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        console.log("render this.props.days in PlansSection", this.props.days);
        return (
            <section className="week" onLoad={this.handleLoad}>
                {daysOfWeek.map((day, index) => {
                    return (<Day key={index}
                                 dataDay={index}
                                 day={day}
                                 tasks={this.props.days[index]}
                                 handleDelete={this.props.handleDelete}
                                 handleSelected={this.props.handleSelected}
                                 onEdit={this.props.onEdit}
                            >
                                    {day}
                                </Day>)
                })}
            </section>
        );
    }
}

export default PlansSection;