import img1 from '../assets/1 (8).png'
import img2 from '../assets/2.png'
import Ret from '../assets/Overall Course Rating.png'
import Revenue from '../assets/Profile View.png'


export default function InstractorDash() {
  return (
    <div>
      <img src={img1} alt="" className='mb-2.5' />
      <img src={img2} alt="" />
      <div className=' w-full mt-2.5 flex gap-6 justify-between '>
      <img src={Revenue} alt="" className=' w-[49%] h-[450px] '  />
      <img src={Ret} alt="" className=' w-[49%] h-[450px]'  />
      </div>
 
    </div>
  )
}
