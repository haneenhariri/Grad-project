
export default function SmallFourth({pic,alt,title,desribtion,color}) {
  return (
    <div className="bg-white flex justify-center items-center flex-col py-5 px-1 w-64		 mr-4">
        <div className=  {` w-16 h-16 flex justify-center items-center mb-6  ${color} ` }  >
          <img src={pic} alt={alt} className="w-8 " />
        </div>
      <h5 className="mb-3 text-sm	">{title}</h5>
      <p className="text-xs	 px-6 text-center	text-gray-500">{desribtion}</p>
    </div>
  )
}
