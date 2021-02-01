import React from "react"
import { InputHTMLAttributes, useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa"

import { Button } from "."

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  pass?: boolean
  width?: string
  col?: string
}

const InputBlock: React.FC<InputProps> = ({ label, pass, width = "", col = "col-12", ...props }) => {
  const [type, setType] = useState("password")

  return (
    <div className={`row mb-2 ${width}`}>
      <div className={`${col} mb-2`}>
        <label htmlFor={props.id}>{label}</label>
        {!pass
          ? <><input className="form-control" {...props} /><span className="inputbd" /></>
          : (
            <>
              <div className="input-group">
                <input className="form-control password" type={type} {...props} />
                <span className="inputbd" />
                <div className="input-group-append">
                  {type === 'password'
                    ? <Button background="gray" type="button" label={<FaEye />}
                      onClick={() => setType("text")}
                    />
                    : <Button background="gray" type="button" label={<FaEyeSlash />}
                      onClick={() => setType("password")}
                    />
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default InputBlock