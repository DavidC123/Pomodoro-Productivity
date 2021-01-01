import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron, Row, Col } from 'react-bootstrap';
import bell from '../Audio/bell_message.mp3';
import click from '../Audio/click.mp3'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mins: 25,              //initial timer minutes amount
            secs: 0,            //initial seconds minutes amount
            startOrStop: "Start",
            btnType: "success"
        }
        var inc;
        this.totalSecs = ((this.state.mins) * 60);
    }

    setTimer(time) {
        this.setState({ startOrStop: "Start", btnType: "success" });
        clearInterval(this.inc); //stops timer if it is still running

        this.setState({ mins: time, secs: 0 });
        this.totalSecs = ((time) * 60);
        document.title = "Pomodoro"
    }

    updateTimer() {
        function countDown(mins) {
            if (this.totalSecs > 0) {
                this.totalSecs--;      //decrement timer
                let minutes = Math.floor(this.totalSecs / 60);
                let seconds = this.totalSecs % 60
                seconds = seconds < 10 ? '0' + seconds : seconds;

                this.setState({ mins: minutes, secs: seconds });
                document.title = this.state.mins + ":" + this.state.secs
            } else if (this.totalSecs === 0) {
                clearInterval(this.inc);

                if (mins === 5 || mins === 15) {
                    this.setTimer(25);
                } else if (mins === 25) {
                    this.setTimer(5);
                }

                document.title = "Pomodoro"

                var ring = new Audio(bell);     //play ring sound effect
                ring.play();
            }
        }
        countDown = countDown.bind(this)

        if (this.state.startOrStop === "Start") {
            var temp = this.state.mins   //stores state mins value to pass on to params of countDown function call
            this.setState({ startOrStop: "Stop", btnType: "danger" });
            this.inc = setInterval(function () { countDown(temp) }, 1000);
        } else {
            this.setState({ startOrStop: "Start", btnType: "success" });
            clearInterval(this.inc);
        }

        var clickSound = new Audio(click);     //play click sound effect
        clickSound.play();
    }

    initSecs() {
        if (this.state.secs === 0) {
            return 0;
        }
    }

    render() {
        return (
            <Jumbotron style={{ backgroundColor: "#6290C8", padding: "2%" }}>
                <Row style={{ textAlign: "center" }}>
                    <Col><Button variant="secondary" size="lg" onClick={() => this.setTimer(25)}>Pomodoro</Button></Col>
                    <Col><Button variant="secondary" size="lg" onClick={() => this.setTimer(5)}>Short Break</Button></Col>
                    <Col><Button variant="secondary" size="lg" onClick={() => this.setTimer(15)}>Long Break</Button></Col>
                </Row>
                <h1 style={{ textAlign: "center", fontStyle: "oblique", fontSize: "10vw" }}>{this.state.mins}:{this.initSecs()}{this.state.secs}</h1>
                <Row style={{ textAlign: "center" }}>
                    <Col><Button variant={this.state.btnType} size="lg" onClick={() => this.updateTimer()}><h3>{this.state.startOrStop}</h3></Button></Col>
                </Row>
            </Jumbotron>
        )
    }
}
export default Timer