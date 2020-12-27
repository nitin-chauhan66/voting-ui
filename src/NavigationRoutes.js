import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { EnterCode } from './screens/EnterEventCode';
import {Login} from './screens/login';
import { AddNewEvent, AdminDashboard } from './screens/newEvent';
import AddOptions from './screens/newEvent/AddOptions';
import { ElectionDashboard, VotingEvent } from './screens/votingDashboard';

const NavigatorRouter = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route  path="/eventCode" component={EnterCode} />
            <Route  path="/votingEvent" component={VotingEvent} />
            <Route  path="/eventDashboard" component={ElectionDashboard} />
            <Route  path="/addNewEvent" component={AdminDashboard} />
            <Route  path="/addCandidates" component={AddOptions} />
        </BrowserRouter>
    )
}

export default NavigatorRouter;