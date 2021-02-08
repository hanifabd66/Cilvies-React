import { FaToggleOn, FaToggleOff } from "react-icons/fa"
import React, { Component } from "react";
import FilmService from "../Services/FilmService";

export default class Film extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.getFilm = this.getFilm.bind(this);
    this.toggleButton = this.toggleButton.bind(this)
    this.updateFilm = this.updateFilm.bind(this);

    this.state = {
      currentFilm: {
        id: null,
        title: "",
        description: "",
        imageUrl: "",
        status: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFilm(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFilm: {
          ...prevState.currentFilm,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentFilm: {
        ...prevState.currentFilm,
        description: description,
      },
    }));
  }

  onChangeImageUrl(e) {
    const imageUrl = e.target.value;

    this.setState((prevState) => ({
      currentFilm: {
        ...prevState.currentFilm,
        imageUrl: imageUrl,
      }
    }))
  }

  getFilm(id) {
    FilmService.retrieveById(id)
      .then((response) => {
        const data = response.data;
        this.setState({
          currentFilm: data
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  updateFilm() {
    FilmService.update(this.state.currentFilm.id, {
      title: this.state.currentFilm.title,
      description: this.state.currentFilm.description,
      imageUrl: this.state.currentFilm.imageUrl,
      status: this.state.currentFilm.status,
    })
      .then((response) => {
        this.setState({
          message: "Data Updated sucsessfuly"
        })
        this.props.history.push("/films")
      })
      .catch((error) => {
        this.setState({
          message: "Error when updating data" + error,
        })
      })
  }

  toggleButton() {
    this.setState({
      currentFilm: {
        ...this.state.currentFilm,
        status: !this.state.currentFilm.status,
      }
    })
  }

  render() {
    const { currentFilm } = this.state;

    return (
      <div className="submit-form">
        {currentFilm ? (
          <div>
            <h4>Update Film</h4>
            <div >
              <label className="form-group" htmlFor="title"><b>Film Title</b></label>
              <input className="form-control" type="text" id="title" name="title" value={currentFilm.title} onChange={this.onChangeTitle} />
            </div>

            <div >
              <label className="form-group" htmlFor="description"><b>Description</b></label>
              <input className="form-control" type="text" id="description" name="description" value={currentFilm.description} onChange={this.onChangeDescription} />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl"><b>Image URL</b></label>
              <input type="text" className="form-control" id="imageUrl" required value={currentFilm.imageUrl} onChange={this.onChangeImageUrl} name="imageUrl" />
            </div>

            <div className="form-group">
              <button className="status" value={currentFilm.status} onClick={this.toggleButton}>{currentFilm.status ? <FaToggleOn size="2.5rem" color="green" /> : <FaToggleOff size="2.5rem" />}</button>
              <p>Status is <span>{currentFilm.status ? "Available" : "Unavailable"}</span></p>
            </div>

            <button className="btn btn-success btn-block" type="submit" onClick={this.updateFilm}>
              Update </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Film...</p>
            </div>
          )
        }
      </div >
    );
  }
}