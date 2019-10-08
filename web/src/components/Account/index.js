import React from 'react'

import Popup from 'reactjs-popup'
import { IoMdClose } from 'react-icons/io'

export default function Account({ open }) {
  return (
    <Popup open={open} closeOnDocumentClick modal position="top center">
      {close => (
        <>
          <a className="close" onClick={close}>
            <IoMdClose />
          </a>

          {localStorage.getItem('user')}
        </>
      )}
    </Popup>
  )
}
