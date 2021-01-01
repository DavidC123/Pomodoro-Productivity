import React from 'react'
import { ListGroup } from 'react-bootstrap';
import white from '../Audio/white_noise.mp3';
import waves from '../Audio/ocean_waves.mp3';
import rain from '../Audio/rain.mp3';

class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            whiteSelected: ["normal", "b8daff"],
            oceanSelected: ["normal", "b8daff"],
            rainSelected: ["normal", "b8daff"]
        }
        this.whiteN = new Audio(white);   //play white noise
        this.oceanN = new Audio(waves);
        this.rainN = new Audio(rain);
        this.soundArray = [this.whiteN, this.oceanN, this.rainN]
    }

    stopAllAudio() {
        for (var i = 0; i < this.soundArray.length; i++) {
            this.soundArray[i].pause();
            this.soundArray[i].currentTime = 0;
        }
    }

    whiteNoise() {
        this.stopAllAudio();
        if (this.state.whiteSelected[0] === "bold") {      //if white noise already selected, then pause noise
            this.setState({ whiteSelected: ["normal", "#b8daff"], oceanSelected: ["normal", "#b8daff"], rainSelected: ["normal", "#b8daff"] });
        } else {
            this.setState({ whiteSelected: ["bold", "#829CBC"], oceanSelected: ["normal", "#b8daff"], rainSelected: ["normal", "#b8daff"] });
            this.whiteN.play();
            this.whiteN.loop = true     //loops the audio
        }
    }

    oceanWaves() {
        this.stopAllAudio();
        if (this.state.oceanSelected[0] === "bold") {      //if ocean waves already selected, then pause noise
            this.setState({ whiteSelected: ["normal", "#b8daff"], oceanSelected: ["normal", "#b8daff"], rainSelected: ["normal", "#b8daff"] });
        } else {
            this.setState({ whiteSelected: ["normal", "#b8daff"], oceanSelected: ["bold", "#829CBC"], rainSelected: ["normal", "#b8daff"] });
            this.oceanN.play();
            this.oceanN.loop = true     //loops the audio
        }
    }

    rain() {
        this.stopAllAudio();
        if (this.state.rainSelected[0] === "bold") {      //if ocean waves already selected, then pause noise
            this.setState({ whiteSelected: ["normal", "#b8daff"], oceanSelected: ["normal", "#b8daff"], rainSelected: ["normal", "#b8daff"] });
        } else {
            this.setState({ whiteSelected: ["normal", "#b8daff"], oceanSelected: ["normal", "#b8daff"], rainSelected: ["bold", "#829CBC"] });
            this.rainN.play();
            this.rainN.loop = true     //loops the audio
        }
    }

    render() {
        return (
            <ListGroup horizontal style={{ textAlign: "center" }}>
                <ListGroup.Item variant="primary" action onClick={() => this.whiteNoise()} style={{ fontWeight: this.state.whiteSelected[0], backgroundColor: this.state.whiteSelected[1] }}>White Noise</ListGroup.Item>
                <ListGroup.Item variant="primary" action onClick={() => this.oceanWaves()} style={{ fontWeight: this.state.oceanSelected[0], backgroundColor: this.state.oceanSelected[1] }}>Ocean Waves</ListGroup.Item>
                <ListGroup.Item variant="primary" action onClick={() => this.rain()} style={{ fontWeight: this.state.rainSelected[0], backgroundColor: this.state.rainSelected[1] }}>Rain Sound</ListGroup.Item>
            </ListGroup>
        )
    }
}
export default Music