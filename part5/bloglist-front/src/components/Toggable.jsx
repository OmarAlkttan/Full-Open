import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {

  const [showContent, setShowContent] = useState(false)

  const toggleVisible = () => {
    setShowContent(!showContent)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  if(showContent){
    return (
      <>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </>
    )
  }else{
    return (
      <button id={props.buttonLabel} onClick={toggleVisible}>
        {props.buttonLabel}
      </button>
    )
  }
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable