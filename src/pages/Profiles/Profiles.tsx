import img  from '../../assets/Image (19).png'


export default function Profiles() {
  return (
    <section className="w-full">
       <form className=" p-6 border rounded-lg w-full"> 
          <div className=" flex  gap-10">
             <div className=" w-1/2">
                <label htmlFor="" className=" block mb-2">First Name</label>
                <input type="text" placeholder=" enter first name " className="w-full bg-transparent border rounded-lg p-4" />
             </div>
             <div className=" w-1/2 ">
                <label htmlFor="" className=" block mb-2">Last Name</label>
                <input type="text" placeholder=" enter last name " className="w-full bg-transparent border rounded-lg p-4" />
             </div>
          </div>
          <div className=" my-2 ">
                <label htmlFor="" className=" block mb-2">Headline</label>
                <input type="text" className="w-full h-28 bg-transparent border rounded-lg p-4" />
          </div>
          <div>
          <label htmlFor="" className=" block mb-2">Image Profile</label>
          <div className=" p-3 border w-max rounded-md">
            <img src={img} alt="" />
          </div>
          <div>
            <label htmlFor="" className=" block my-2">Add/Change Image</label>
            <input type="file" className="w-full bg-transparent border rounded-lg p-4"  />
          </div>
          <h3 className='my-3 font-semibold text-2xl'>Links</h3>
          <div>
            <label htmlFor="" className=" block mb-2">Website</label>
            <input type="text"  className="w-full bg-transparent border rounded-lg p-4" />
            <label htmlFor="" className=" block mb-2">LinkedIn</label>
            <input type="text"  className="w-full bg-transparent border rounded-lg p-4" />
            <label htmlFor="" className=" block mb-2">Facebook</label>
            <input type="text"  className="w-full bg-transparent border rounded-lg p-4" />
          </div>
          <button className=' py-2.5 px-6 my-3 text-white bg-violet-950 rounded-md'>Save</button>
          </div>
       </form>
    </section>
  )
}
