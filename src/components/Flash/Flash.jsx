import React, { useEffect } from 'react'

const Flash = () => {
  const isFlash = JSON.parse(localStorage.getItem('localFlash'))

  useEffect(() => {
    const flash = document.querySelector('#flash')
    if (isFlash) {
      flash.classList.remove('off')
      setTimeout(() => {
        flash.classList.add('on')
      }, 100)
      setTimeout(() => {
        flash.classList.remove('on')
      }, 600)
      setTimeout(() => {
        flash.classList.add('off')
      }, 1200)
    }
  })

  return (
    <div id="flash" className="flash off" />
  )
}

export default Flash
