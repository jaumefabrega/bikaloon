import React from 'react'
import "./BoxedRadio.css"

export default function BoxedRadio({name, id, allOptions, selectedOptionId, disabledOptionsIds, handleChange}) {
  return (
    <div className="boxed-radio">
      <h3>{name}</h3>
      {allOptions.map(option => {
        const isDisabled = disabledOptionsIds.includes(+option.id);
        return (
          <label key={option.id} className={ option.id == selectedOptionId ? "checked" : isDisabled ? "disabled" : ""}>
            {option.value}
            <input type="radio" name={name} value={option.id} checked={option.id === selectedOptionId ? "checked" : ""} onChange={isDisabled ? () => {} : (event) => handleChange(event, id)}/>
          </label>
        )
      })}
    </div>
  )
}
