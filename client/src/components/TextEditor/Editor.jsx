import React, { useState, useRef, useEffect } from 'react'

function Editor() {
  const [html, setHtml] = useState('')

  const divRef = useRef(null)

  const moveCaretToEnd = () => {
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(divRef.current)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  const handleEnter = (e) => {
    e.preventDefault()
    const currentElement = document.getSelection().anchorNode.parentNode
    const newElement = document.createElement('p')
    newElement.className = 'flex flex-col'
    currentElement.parentNode.insertBefore(
      newElement,
      currentElement.nextSibling
    )
    const range = document.createRange()
    const sel = window.getSelection()
    range.setStart(newElement, 0)
    range.setEnd(newElement, 0)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  const handleList = (type) => {
    const currentElement = document.getSelection().anchorNode.parentNode
    if (currentElement.tagName === 'LI') {
      const newElement = document.createElement('p')
      newElement.innerHTML = currentElement.innerHTML
      currentElement.parentNode.parentNode.insertBefore(
        newElement,
        currentElement.parentNode.nextSibling
      )
      currentElement.parentNode.removeChild(currentElement)
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(newElement, 0)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    } else {
      const newElement = document.createElement('li')
      newElement.innerHTML = currentElement.innerHTML
      const newList = document.createElement(type)
      newList.appendChild(newElement)
      currentElement.parentNode.insertBefore(
        newList,
        currentElement.nextSibling
      )
      currentElement.parentNode.removeChild(currentElement)
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(newElement, 0)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  const handleLink = (e) => {
    const inputText =
      e.data || (e.clipboardData && e.clipboardData.getData('text/plain'))
    const isLink = /^https?:\/\/\S+/.test(inputText)
    if (isLink) {
      e.preventDefault()
      const newElement = document.createElement('a')
      newElement.href = inputText
      newElement.textContent = inputText
      const currentElement = document.getSelection().anchorNode.parentNode
      currentElement.appendChild(newElement)
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStartAfter(newElement)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  useEffect(() => {
    moveCaretToEnd()
  }, [])

  return (
    <div className=' w-[500px] m-2 p-2 border-1 border-stroke mt-[100px]'>
      <div className='flex w-[300px] items-center h-[50px] mt-1 rounded-[5px] bg-mainBg space-x-2'>
        <button
          className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
          onClick={() => handleList('ul')}>
          Bullet List
        </button>
        <button
          className='flex rounded-[5px] text-gray text-14 font-bold bg-gray justify-center items-center hover:bg-grayHover hover:text-grayHover py-1 px-2'
          onClick={() => handleList('ol')}>
          Numbered List
        </button>
      </div>
      <div
        className='w-full flex flex-col mt-2 p-2 rounded-[5px] bg-mainBg space-x-2'
        ref={divRef}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={(e) => {
          setHtml(e.target.innerHTML)
          handleLink(e)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleEnter(e)
          }
        }}>
        <p>Начните писать текст здесь...</p>
      </div>
    </div>
  )
}

export default Editor
