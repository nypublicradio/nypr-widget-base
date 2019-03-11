import React, { Component } from 'react'
import getattr from 'safe-object';
import queryString from 'query-string';
import pym from 'pym.js';

const THEMES = process.env.REACT_APP_THEMES;

export default class NyprWidgetBase extends Component {
  state = {
    // styles are pullled in from the themes endpoint as a JSON object
    // and applied as dynamic inline css
    styles: {}
  }

  constructor(props) {
    super(props);
    // pym manages communication via iframe so the toolkit site users can make
    // real time configuration changes
    this.embed = new pym.Child({polling: 200});
    this.embed.onMessage('incoming', this.listener);

    // the toolkit waits for the `mounted` message before attempting to communicate
    this.embed.sendMessage('mounted');

    if (window.location.search) {
      this.state = {...this.state, ...queryString.parse(window.location.search)}
      if (this.state.brand) {
        this.updateBrand();
      }
    } else {
      this.state = {...this.state, ...props}
    }
  }

  componentWillUnmount() {
    this.embed.remove();
  }

  componentDidUpdate(props, { brand }) {
    if (this.state.brand !== brand) {
      this.updateBrand();
    }
  }

  updateBrand() {
    fetch(`${THEMES}/${this.state.brand}.json`)
      .then(r => r.json())
      .then(styles => this.setState({styles}));
  }

  // search for the value at the given keypath on our local styles object
  // e.g. an object like this:
  // {
  //   button: {
  //     color: "black",
  //     padding: "12px 18px"
  //   }
  // }
  // style("button") -> { color: "black", padding: "12px 18px" }
  // style("button.color") -> { color: "black" }
  style(path) {
    let parts = path.split('.');
    if (parts.length === 1) {
      // get everything nested under this path
      return this.state.styles[path];
    } else {
      // look for a specific path
      let key = parts.slice(-1);
      return { [key]: getattr(this.state, `styles.${path}`) };
    }
  }

  // postMessage sends/receives as strings
  // JSONify whatever comes in
  parse(data) {
    let message = {};
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch(e) {/* Ignored */}
    }
    return message;
  }

  listener = data => {
    let query = this.parse(data);
    this.setState(query);
  }

  // concrete classes implement render
  render() {
    return null;
  }
}
