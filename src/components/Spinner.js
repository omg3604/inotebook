import React, { Component } from 'react'
import loading from '../spinner.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-5'>
        <img className='my-3' src={loading} alt="loading"></img>
      </div>
    )
  }
}