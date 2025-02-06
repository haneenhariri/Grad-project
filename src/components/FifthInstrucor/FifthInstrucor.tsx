import React from 'react'

export default function FifthInstrucor({color,title,desc,li1,li2,li3,li4,pic1,}) {
  return (
    <section className={ ` px-4 lg:px-20 desktop:px-40 flex justify-between py-24  ${color} `} >
      <div className='w-1/2'>
        <h3 className='text-4xl mb-4	'> {title}</h3>
        <p className='text-base	 text-gray-500 mb-4'>{desc}</p>
        <ul className='	 list-disc ml-4 text-base	' >
          <li className='	mb-3'>{li1}</li>
          <li className='	mb-3'>{li2}</li>
          <li className='	mb-3'>{li3}</li>
          <li >{li4}</li>
        </ul>
      </div>

        <img src={pic1} alt={"an employement "} className='w-1/3' />

    </section>
  )
}
