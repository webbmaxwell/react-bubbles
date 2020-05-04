import React from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { initialColor } from "./ColorList";

const AddForm = () => {

  const [newColor, setNewColor] = useState(initialColor);

  const addColor = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data)

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
          />
        </label>
    </div>
  )
}
