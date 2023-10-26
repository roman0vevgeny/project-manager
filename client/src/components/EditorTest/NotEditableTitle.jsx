import React from 'react'
import styles from '../TaskDescription/TaskDescription.module.scss'
import parse, { domToReact } from 'html-react-parser'

const NotEditableTitle = ({ name }) => {
  const listStyle = {
    listStyleType: 'disc',
    display: 'table',
    listStylePosition: 'outside',
    verticalAlign: 'top',
  }

  const listStyleBullet = {
    listStyleType: 'decimal',
    display: 'table',
    listStylePosition: 'outside',
    verticalAlign: 'top',
  }

  const listItemStyle = {
    display: 'table-row',
    verticalAlign: 'top',
    listStylePosition: 'outside',
  }

  return (
    <>
      {name && (
        <div className='relative text-14 min-w-[200px] pr-2 pt-[0px] mb-[10px] mt-[0px] max-w-[720px] text-grayHover text-start leading-1.5 flex-grow mr-10 w-full break-words'>
          <div className='w-full'>
            {parse(name, {
              replace: (domNode) => {
                if (domNode.name === 'ul') {
                  return (
                    <ul
                      className='ml-4 my-[0.5rem] w-full list-inside px-2 leading-1.5'
                      style={listStyle}>
                      {domToReact(domNode.children)}
                    </ul>
                  )
                } else if (domNode.name === 'ol') {
                  return (
                    <ol
                      className='ml-4 my-[0.5rem] w-full list-inside px-2 leading-1.5'
                      style={listStyleBullet}>
                      {domToReact(domNode.children)}
                    </ol>
                  )
                } else if (domNode.name === 'li') {
                  return (
                    <li
                      className='ml-4 my-1 w-full list-inside px-2 leading-1.5'
                      style={listItemStyle}>
                      {domToReact(domNode.children)}
                    </li>
                  )
                } else if (domNode.name === 'p') {
                  return (
                    <h6 className={styles.textH}>
                      {domToReact(
                        domNode.children.map((child) => {
                          if (child.name === 'a') {
                            const style = {
                              // width: '200px',
                              // overflow: 'hidden',
                              // textOverflow: 'ellipsis',
                              // whiteSpace: 'nowrap',
                              // display: 'block',
                            }

                            const styleString = Object.entries(style)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join('; ')

                            return {
                              ...child,
                              attribs: {
                                ...child.attribs,
                                href: child.attribs.href,
                                target: '_blank',
                                rel: 'noopener noreferrer nofollow',
                                style: styleString,
                              },
                            }
                          } else {
                            return child
                          }
                        })
                      )}
                    </h6>
                  )
                }
              },
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default NotEditableTitle
