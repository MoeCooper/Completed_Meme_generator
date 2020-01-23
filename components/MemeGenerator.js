import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        //pulls the memes array from response.data
        const { memes } = response.data;
        //console.log(memes[0]);
        //setState is object because we don't care about what previous state is
        this.setState({
          allMemeImgs: memes
        });
      });
    //binds method to constructor
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    //pulls name and value properties from event.target, allows you to get name of state to update, and whatever is actually typed into the box
    const { name, value } = event.target;
    this.setState({
      //whatever the name is, give it the value we pulled
      [name]: value
    });
  }

  handleClick(event) {
    //if event is not explicitly handled, default action should not be taken as normal
    event.preventDefault();

    const randNumber = Math.floor(
      Math.random() * this.state.allMemeImgs.length
    );
    //sets index of allMemeImgs url property to random number algorithm created above
    const randomMemeImg = this.state.allMemeImgs[randNumber].url;
    //set the state of random url image we grabbed
    this.setState({
      randomImg: randomMemeImg
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleClick}>
          <input
            type="text"
            placeholder="Top Text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
          />

          <input
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
