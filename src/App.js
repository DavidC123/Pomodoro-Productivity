import Timer from "./Components/Timer";
import Music from "./Components/Music";
import ToDoList from "./Components/ToDoList";
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faVolumeUp, faTasks } from '@fortawesome/free-solid-svg-icons'

function App() {

  document.body.style.backgroundColor = '#376996';
  document.body.style.color = '#FFFFFF';

  return (
    <Container>
      <br />
      <h1 class="text-center" style={{ fontWeight: "bold" }}> Pomodoro Productivity </h1>
      <br />
      <Row>
        <FontAwesomeIcon icon={faClock} size="lg" style={{ marginLeft: "1em" }} />
        <strong>&thinsp; Pomodoro Timer</strong>
      </Row>
      <Timer />
      <br />
      <Row>
        <FontAwesomeIcon icon={faVolumeUp} size="lg" style={{ marginLeft: "1em" }} />
        <strong>&thinsp; Select a background noise:</strong>
      </Row>
      <Music />
      <br /><br />
      <Row>
        <FontAwesomeIcon icon={faTasks} size="lg" style={{ marginLeft: "1em" }} />
        <strong>&thinsp; To-Do’s:</strong>
      </Row>
      <ToDoList />
    </Container>
  );
}

export default App;
