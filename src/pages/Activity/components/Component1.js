import React from 'react'
import { Spring } from 'react-spring/renderprops'

export default function Component1() {
  return (
    <Spring
      from={{
        opacity: 0,
        marginTop: -500,
      }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props} className="">
          <div style={c1Style}>
            <img
              src={require('../../../images/activity/activity-banner.png')}
              alt=""
              className=""
            />
            {/* <h1>Component 1</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
              nobis adipisci eum minima deserunt at porro, veritatis officia
              commodi itaque voluptates vel suscipit assumenda soluta ipsa
              voluptatibus laudantium labore harum?
            </p> */}
            {/* <Spring
              from={{ number: 0 }}
              to={{ number: 10 }}
              config={{ duration: 10000 }}
            >
              {(props) => (
                <div style={props}>
                  <h1 style={counter}>{props.number.toFixed()}</h1>
                </div>
              )}
            </Spring> */}
          </div>
        </div>
      )}
    </Spring>
  )
}

const c1Style = {
  //backgroundImage: 'url(../../../images/activity/activity-banner.png)',
  background: '#e0e0e0',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  // padding: '1.5rem',
  // height: '50vh',
}
