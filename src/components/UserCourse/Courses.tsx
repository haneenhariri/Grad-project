import { courseData } from "../../data/Courses";


export default function Courses() {
  return (
    <div className=" my-10">
            <div className=' flex justify-between gap-5'>
              {courseData.slice(0,1).map((e, i) => (
                  <div key={i} className=" p-5 w-1/3 bg-gray-h rounded-lg">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
      
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

              </div>
              ))}
              {courseData.slice(1,2).map((e, i) => (
                  <div key={i} className="w-1/3 p-5 bg-gray-h  rounded-lg ">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

                 
              </div>
              ))}
              {courseData.slice(3,4).map((e, i) => (
                  <div key={i} className="w-1/3 p-5 bg-gray-h  rounded-lg">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

              </div>
              ))}
              
            </div>
            <div className='mt-10 flex justify-between gap-5'>
              {courseData.slice(4,5).map((e, i) => (
                  <div key={i} className=" p-5 w-1/3 bg-gray-h  rounded-lg">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
      
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

              </div>
              ))}
              {courseData.slice(5,6).map((e, i) => (
                  <div key={i} className="w-1/3 p-5 bg-gray-h  rounded-lg ">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

                 
              </div>
              ))}
              {courseData.slice(6,7).map((e, i) => (
                  <div key={i} className="w-1/3 p-5 bg-gray-h  rounded-lg">
                  <img src={e.img} alt={e.title} className="w-full h-48" />
                  <div className=" flex justify-between my-5">
                  <p className=" font-semibold text-sm">{e.instructor}</p>
                  </div>
                  <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
                  <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>
              </div>
              ))}
              
            </div>
            <div className="flex justify-center gap-4 mt-8">
        
          <button
            
            className="px-4  border-violet-950"
          >
            Previous
          </button>
        
        <span className="self-center">Page 1 of 3</span>
      
          <button
           
            className="px-4  border-violet-950"
          >
            Next
          </button>
          </div>
        
    </div>
  )
}
