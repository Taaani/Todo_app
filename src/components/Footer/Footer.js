import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <>
     <div className="container-fluid">
        <div className="row">
            <div className="col bg-primary py-2">
                <p className='text-center text-light mb-0'>&copy; {year}. All Rights Reserved</p>
            </div>
        </div>
     </div>
    </>
  )
}

export default Footer