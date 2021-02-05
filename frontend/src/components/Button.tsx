import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  background: "blue" | "gray" | "green" | "purple" | "red" | "typescript" | "yellow"
  label: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ background, label, ...props }) => {
  let classes = 'btn'

  if (background !== 'gray' && background !== 'yellow') classes += ` btn-${background} text-white`
  else classes += ` btn-${background} text-dark`

  if (props.className) classes += ` ${props.className}`

  return (
    <button {...props} className={classes}>
      {label}
    </button>
  )
}

export default Button
