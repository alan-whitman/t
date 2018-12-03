import React, { Component } from 'react';
import DashboardNav from './DashboardNav';
import Board from './Board';
import Scores from './Scores';
import Leaderboard from './Leaderboard';
import Rankings from './Rankings';
import Landing from './Landing';
import { Switch, Route } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Dashboard.css';


class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <div className="menu-holder">
                    <ReactCSSTransitionGroup
                        transitionName="menu"
                        transitionEnter={true}
                        transitionEnterTimeout={200}
                        transitionLeave={true}
                        transitionLeaveTimeout={200}>
                        {this.props.showMenu ?
                            <DashboardNav toggleMenu={this.props.toggleMenu} />
                        : null}
                    </ReactCSSTransitionGroup>
                </div>
                <div className="content-area">
                    <Switch>
                        <Route path="/spleaderboard" exact component={Leaderboard} />
                        <Route path="/mpleaderboard" component={Rankings} />
                        <Route path="/sp" exact render={(props) => <Board {...props} user={this.props.user} isLoggedIn={this.props.isLoggedIn} mode={'sp'} key={'sp' + this.props.isLoggedIn} />} />
                        <Route path="/mp" exact render={(props) => <Board {...props} user={this.props.user} isLoggedIn={this.props.isLoggedIn} mode={'mp'} key={'mp' + this.props.isLoggedIn} />} />
                        <Route path="/scores/:username" render={(props) => <Scores {...props} isLoggedIn={this.props.isLoggedIn} />} />
                        <Route path="/scores" render={(props) => <Scores {...props} isLoggedIn={this.props.isLoggedIn} user={this.props.user} />} />
                        <Route path="/" component={Landing} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard;