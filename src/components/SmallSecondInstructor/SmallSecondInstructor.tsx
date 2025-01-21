
export default function SmallSecondInstructor({icon,alt,span1,span2} ) {
  return (
    <div className="flex w-52		 ">
      <img src={icon} alt={alt}  className="w-10 h-10 mr-4"/>
      <div className="flex flex-col">
        <span className="text-2xl mb-2">{span1}</span>
        <span className="text-sm">{span2}</span>
      </div>
    </div>
  )
}
