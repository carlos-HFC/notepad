import { InputHTMLAttributes } from 'react'

const RadioButton: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
   return (
      <div className="form-check-inline" title={props.title}>
         <input type="radio" {...props} className="form-check-input" />
         <label htmlFor={props.id} className="form-check-label">{props.children}</label>
      </div>
   )
}

export default RadioButton
