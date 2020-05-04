import React, { useState } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";

const blankColor = {
  color: "",
  code: { hex: "" }
}

const AddForm = () => {

  const [newColor, setNewColor] = useState(blankColor);

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data);
        setNewColor(res.data);

      })
  }
  return (
    <div>
      <form onSubmit={addColor}>
        <legend>new color</legend>
        <label>
          colorname:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                color: e.target.value
              })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
