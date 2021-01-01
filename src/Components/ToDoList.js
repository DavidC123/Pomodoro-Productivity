import React from 'react'
import { Button, Jumbotron, Row, Col, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            inputTask: '',
            pomodoros: 1,
            est: 0,         //estimated duration === (30*(pomodoros))-5
            taskList: [],    //in array collection of tasks
        }
    }

    updateTask(input) {
        this.setState({
            inputTask: input
        })
    }

    decrement() {
        if (this.state.pomodoros >= 2) {
            this.setState({
                pomodoros: this.state.pomodoros - 1
            })
        }
    }

    increment() {
        this.setState({
            pomodoros: this.state.pomodoros + 1
        })
    }

    addToList() {
        const newItem = {
            id: Math.random() * Number.MIN_SAFE_INTEGER,
            inputTask: this.state.inputTask.slice(),
            pomodoros: this.state.pomodoros,
            est: (30 * (this.state.pomodoros)) - 5,
            //check box styling
            txtDecoration: "initial",
            color: "white"
        }

        let tempList = this.state.taskList

        if (newItem.inputTask !== '') {
            tempList.push(newItem);
            this.setState({
                show: !this.state.show,
                inputTask: '',
                pomodoros: 1,
                est: 0,
                taskList: tempList
            })
        } else {
            alert("Please fill out the task field");
        }
    }

    deleteTask(id) {
        let tempList = this.state.taskList
        let tempList2 = tempList.filter((item) => item.id !== id)

        this.setState({
            taskList: tempList2
        })
    }

    getTime() {
        var d = new Date();
        var time = 0
        for (var i = 0; i < (this.state.taskList).length; i++) {
            time += (this.state.taskList[i].est)
        }

        if (time > 0) {
            var newDateObj = new Date(d.getTime() + time * 60000);
            var hours = newDateObj.getHours();
            var mins = newDateObj.getMinutes();
            mins = mins < 10 ? '0' + mins : mins;
            return "Estimated Finish Time: " + hours + ":" + mins;
        }
    }

    checkBox(event, id) {
        let tempList = this.state.taskList
        if (event.target.checked === true) {
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].id === id) {
                    tempList[i].txtDecoration = "line-through";
                    tempList[i].color = "black";
                }
            }
        } else {
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].id === id) {
                    tempList[i].txtDecoration = "initial";
                    tempList[i].color = "white";
                }
            }
        }
        this.setState({
            taskList: tempList
        })
    }

    render() {
        return (
            <div>
                <Jumbotron style={{ backgroundColor: "#6290C8", padding: "2%" }}>

                    {this.state.taskList.map(task => {
                        return (
                            <div>
                                <Row style={{ textAlign: "center" }}>
                                    <Col>
                                        <label>
                                            <input type="checkbox" name="checkbox" value="value" onClick={(e) => { this.checkBox(e, task.id) }} />
                                            <strong style={{ textDecoration: task.txtDecoration, color: task.color }}> {task.inputTask}</strong>
                                        </label>
                                    </Col>
                                    <Col style={{ textDecoration: task.txtDecoration, color: task.color }}><strong>{task.pomodoros}</strong> Pomodoro Sessions</Col>
                                    <Col><Button variant="danger" style={{ color: task.color }} onClick={() => this.deleteTask(task.id)}>Delete</Button></Col>
                                </Row>
                                <hr />
                            </div>
                        )
                    })}

                    <hr style={{ border: "1px solid #FFFFFF" }} />
                    <Row style={{ textAlign: "center", fontSize: "1.5vw" }}>
                        <Col><strong>{this.getTime()}</strong></Col>
                    </Row>
                    <br />
                    <Row style={{ textAlign: "center" }}>
                        <Col><Button variant="success" size="lg" onClick={() => { this.setState({ show: !this.state.show }) }}>Add A Task</Button></Col>
                    </Row>
                </Jumbotron>

                <Modal
                    show={this.state.show}
                    onHide={() => { this.setState({ show: !this.state.show }) }}
                    size="lg"
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ color: "black" }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "green" }} />
                            <strong>&thinsp; Add Task</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={9}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Task: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="What is your task?" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.inputTask} onChange={(e) => this.updateTask(e.target.value)} />
                                </InputGroup>
                            </Col>
                            <Col style={{ textAlign: "center" }} xs={3}>
                                <Button variant="info" size="sm" style={{ marginRight: "8%", marginTop: "0px" }} onClick={() => this.decrement()}>-</Button>
                                <strong>{this.state.pomodoros}</strong>
                                <Button variant="info" size="sm" style={{ marginLeft: "8%", marginTop: "0px" }} onClick={() => this.increment()}>+</Button>
                                <p>Estimated Pomodoros</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={() => this.addToList()} size="lg" block >ADD TASK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default ToDoList
