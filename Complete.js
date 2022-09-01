import React from "react";
import {Link} from 'react-router-dom';
import ExpenseItems from "../Expenses/Expenses";
import classes from "./Complete.module.css";

const Complete = () => {
    return(
        <div className={classes.com}>
            <header>
                <h2>Welcome to ExpenseTracker</h2>
                <p>your profile is not complete.
                    <Link to="/complete_now">Complete Now</Link>
                </p>
            </header>
            <div>
                <ExpenseItems></ExpenseItems>
            </div>
        </div>
    );
};

export default Complete;