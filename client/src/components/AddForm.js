import React from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddForm = () => {
  const addColor = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data)

      })
  }
  return (
    <>
      <form onSubmit={addColor}>
    </>
  )
}
