import SmallFourth from "../SmallFourth/SmallFourth";
import pic1 from "../../../src/assets/instructor/icons/NewspaperClipping.png"
import pic2 from "../../../src/assets/instructor/icons/IdentificationCard.png"
import pic3 from "../../../src/assets/instructor/icons/PlayCircle.png"
import pic4 from "../../../src/assets/instructor/icons/Handshake.png"

export default function FourthInstrucor() {
  return (
    <section className="px-4 lg:px-20 desktop:px-40 bg-purple-100  py-20  flex flex-col justify-between items-center ">
        <h3 className="text-3xl	text-center w-1/3 mb-10"> How you'll become successful instructor </h3>
        <div className="flex justify-between">
            <SmallFourth 
            pic={pic1} 
            alt={"NewspaperClipping"}
            title={"1. Apply to become instructor."}
            desribtion={"Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consequat eu."} 
            color={"bg-slate-200 "} />

            <SmallFourth 
            pic={pic2} 
            alt={"IdentificationCard"}
            title={"2. Setup & edit your profile."}
            desribtion={"Duis non ipsum at leo efficitur pulvinar. Morbi semper nisi eget accumsan ullamcorper."} 
            color={"bg-pink-100 "} />

            <SmallFourth 
            pic={pic3} 
            alt={"PlayCircle"}
            title={"3. Create your new course"}
            desribtion={"Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque. "} 
            color={"bg-yellow-100 "} />

            <SmallFourth 
            pic={pic4} 
            alt={"Handshake"}
            title={"4. Start teaching & earning"}
            desribtion={"Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque. "} 
            color={"bg-sky-100"} />
        </div>
      
    </section>
  )
}
