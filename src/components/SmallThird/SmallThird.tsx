import tick from "../../../src/assets/instructor/icons/CheckCircle.png"
export default function SmallThird({title,description} : {title : string; description : string;}) {
  return (
    <div className="mb-6 flex">
      <img src={tick} alt="CheckCircle" className="w-6 h-6 mr-4"/>
      <div>
        <h5 className="text-sm mb-2.5">{title}</h5>
        <p className="text-xs text-gray-500">{description} </p>
      </div>
    </div>
  )
}
