import screenimg from "../../../src/assets/instructor/third.png"
import SmallThird from "../SmallThird/SmallThird"

export default function ThirdInstructor() {
  return (
    <section className='px-4 lg:px-20 desktop:px-40 pt-24 flex justify-between'>
      <img src={screenimg} alt="screen" className="w-1/3 hidden lg:block mr-20 "/>
      <div className="w-full lg:w-1/2"> 
        <h3 className="text-center lg:text-start text-2xl mb-6">Why you’ll start teaching on Eduguard</h3>
        <p className="text-center lg:text-start text-sm mb-8 text-gray-500">Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque, vitae auctor arcu ornare. Cras vitae nulla a purus mollis venenatis. </p>
        <SmallThird title={"Tech your students as you want."} description={"Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus. "}/>
        <SmallThird title={"Manage your course, payment in one place"} description={"Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consequat eu. Nullam vel libero pharetra, euismod turpis et, elementum enim."}/>
        <SmallThird title={"Chat with your students"} description={"Nullam mattis lectus ac diam egestas posuere. Praesent auctor massa orci, ut fermentum eros dictum id. "}/>
      </div>
    </section>
  )
}
