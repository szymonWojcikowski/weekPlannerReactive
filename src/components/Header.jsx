import React from "react";

const Header = (props) => {

    return (
        <header>
            <h1>Week Planner</h1>
            <button onClick={props.handleClick} name="openAddFormClicked" className="btn" id="addTaskButton">Add Task</button>
        </header>
    )
};

export default Header;