import React, { Component } from "react";
import FilmService from '../Services/FilmService'
import { FaToggleOff, FaToggleOn } from "react-icons/fa"

export default class CreateFilm extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.newFilm = this.newFilm.bind(this);
    this.saveFilm = this.saveFilm.bind(this);
    this.toggleButton = this.toggleButton.bind(this)

    this.state = {
      id: null,
      title: "",
      description: "",
      imageUrl: "",
      status: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeImageUrl(e) {
    this.setState({
      imageUrl: e.target.value,
    });
  }

  newFilm() {
    this.setState({
      id: null,
      title: "",
      description: "",
      imageUrl: "",
      status: false,
    });
  }

  saveFilm() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      status: this.state.status,
    };

    FilmService.create(data)
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  }

  toggleButton() {
    console.log(this.state.status)
    this.setState({
      status: !this.state.status,
    })
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You Submitted Successfully!</h4>
            <button onClick={this.newFilm}>Add</button>
          </div>
        ) : (
            <div >
              <div className="form-group">
                <label htmlFor="title"><b>Film Title</b></label>
                <input type="text" className="form-control" id="title" required value={this.state.title} onChange={this.onChangeTitle} name="title" />
              </div>

              <div className="form-group">
                <label htmlFor="description"><b>Description</b></label>
                <textarea type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangeDescription} name="description" />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl"><b>Image URL</b></label>
                <input type="text" className="form-control" id="imageUrl" required value={this.state.imageUrl} onChange={this.onChangeImageUrl} name="imageUrl" />
              </div>

              <div className="form-group">
                <button className="status" value={this.state.status} onClick={this.toggleButton} name="status">{this.state.status ? <FaToggleOn size="2.5rem" color="green" /> : <FaToggleOff size="2.5rem" />}</button>
                <p>Status is <span>{this.state.status ? "Available" : "Unavailable"}</span></p>
              </div>

              <button className="btn btn-success btn-block" onClick={this.saveFilm}>Create Movie</button>

            </div>
          )
        }
      </div>
    );
  }
}