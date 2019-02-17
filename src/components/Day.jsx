import React from "react";

import Task from "./Task.jsx";

class Day extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {};
    }

    render() {
        return (
            <ul className="day">
                {this.props.tasks.sort( (a, b) => b.taskPriority - a.taskPriority).map( (item, index) => {
                    return (
                        <Task
                            key={index}
                            id={item.id}
                            taskName={item.taskName}
                            taskPriority={item.taskPriority}
                            estimatedTime={item.estimatedTime}
                            selected={item.selected}
                            handleDelete={this.props.handleDelete(this.props.dataDay)}
                            handleSelected={this.props.handleSelected(this.props.dataDay)}
                            // onEdit={this.props.onEdit(this.props.dataDay)}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default Day;