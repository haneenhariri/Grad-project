import Button from "../Ui/Button/Button";
import link from '../assets/Instructor Profile (3).png'
import img2 from '../assets/Change Password.png'
import Changepassword from "../components/Changepassword/Changepassword";
export default function InstractSettings() {
  return (
    <>
        <div className=" p-5 bg-white rounded-md ">
      <div className=" flex gap-6  justify-between">
        <div className="w-full">
          <h3 className="my-2.5 text-3xl">Account Settings</h3>
          <label htmlFor="" className=" mb-1.5">Full name</label>
          <div className="flex justify-between gap-5 mb-5">
            <input type="text" className=" w-full border p-2 border-violet-600 bg-transparent  placeholder:text-sm" placeholder="First name"/>
          </div>
          <label htmlFor="" className=" mb-1.5">Email</label>
          <div className="flex justify-between gap-5 mb-5">
            <input type="text" className=" w-full border p-2 border-violet-600 bg-transparent  placeholder:text-sm" placeholder="First name"/>
          </div>
          <Button text="Save changes" Bg="bg-btn" textColor="text-white"/>
        </div>
        <div className="flex relative w-1/3 h-max p-4 mt-12 bg-gray-h shadow-sm flex-col justify-evenly items-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="w-40 h-40  overflow-hidden border-2 border-gray-300">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                      Upload Photo
                    </div>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <p className="text-xs  text-center  text-gray-500 mt-2">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
        </div>
      </div>

          
          <div className=" my-4">
          <Changepassword/>
          </div>
       
    </div>
    
    </>

  )
}
