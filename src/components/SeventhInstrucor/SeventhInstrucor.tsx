import Quotes from "../../../src/assets/instructor/icons/Quotes.png"
import Right from "../../../src/assets/instructor/icons/ArrowRight (1).png"
import left from "../../../src/assets/instructor/icons/ArrowRight.png"
import mainimage from "../../../src/assets/instructor/Images.png"
export default function SeventhInstrucor() {
  return (
    <section className="flex px-4 lg:px-20 desktop:px-40 justify-center items-center py-16">
       <div className="w-2/5 mr-32 px-6">
        <h3 className="text-2xl mb-4">20k+ Instructor created their success story with eduguard</h3>
        <p className="text-xs	mb-4	 text-gray-500 ">Nunc euismod sapien non felis eleifend porttitor. Maecenas dictum eros justo, id commodo ante laoreet nec. Phasellus aliquet, orci id pellentesque mollis.</p>
        <div className="bg-purple-200 p-4 mb-4">
            <img src={Quotes} alt="quotesicon" className="w-10 mb-4	"/>
        <p className="text-xs leading-5	">Nulla sed malesuada augue. Morbi interdum vulputate imperdiet. Pellentesque ullamcorper auctor ante, egestas interdum quam facilisis commodo. Phasellus efficitur quis ex in consectetur. Mauris tristique suscipit metus, a molestie dui dapibus vel.</p>
        </div>
        <div className="flex">
            <div className=" flex justify-center items-center shadow	 bg-purple-200 mr-1">
                <img src={left} alt="left icon" />
                </div>
            <div className=" flex justify-center items-center shadow	 bg-purple-400">
                <img src={Right} alt="Right icon" />
                </div>
            
        </div>
       </div>
       <img src={mainimage} alt="Instructors" className="w-2/5" />
    </section>
  )
}
