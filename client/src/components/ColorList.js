import React, { useState } from "react";
import axios from "axios";

import AddForm from "./AddForm";

import { axiosWithAuth } from "../utils/axiosWithAuth";

export const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        setColorToEdit(res.data)
      })
      .catch(err => console.error(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)

      })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/colors/", newColor)
      .then(res => {
        console.log(res.data);
        setNewColor(res.data);
      })
      .catch(err => console.error(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  color: e.target.value
                })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              type="text"
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
