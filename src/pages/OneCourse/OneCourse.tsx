import instrc from '../../assets/Image (24).png'
import courseImg from '../../assets/courses/Trailer (1).png'
import check from '../../assets/CheckCircle.png'
import arrow from '../../assets/ArrowRight.png'
import alarm from '../../assets/icons/Alarm (1).png'
import clock from '../../assets/icons/Clock.png'
import level from '../../assets/icons/bar-chart.png'
import user from '../../assets/icons/Users.png'
import lang from '../../assets/icons/Notebook.png'
import table from '../../assets/icons/Monitor.png'
import folder from '../../assets/icons/FolderNotchOpen.png'
import video from '../../assets/icons/PlayCircle.png'
import arrowDown from '../../assets/icons/Arrow - Down 2.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
 
export default function OneCourse() {
    const [isOpen, setIsOpen] = useState(false);
    const [balance, setBalance] = useState(150); // رصيد المستخدم الافتراضي
    const coursePrice = 100; // سعر الكورس
    const [message, setMessage] = useState("");
  
    const handlePurchase = () => {
      setIsOpen(true);
      setMessage("Do you want to purchase this course?");
    };
  
    const confirmPayment = () => {
      if (balance >= coursePrice) {
        setBalance(balance - coursePrice);
        setMessage("Payment successful! Do you want to view the course or go to the dashboard?");
      } else {
        setMessage("Insufficient balance!");
      }
    };
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate()
    const [accordionStates, setAccordionStates] = useState<Record<string, boolean>>({ 'module-1': true,});
    const toggleAccordion = (id: string) => {
        setAccordionStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id], 
        }));
    };
  return (
    <section className="px-4 py-20 lg:px-20 desktop:px-40 gap-6 flex">
        <div className=" w-10/12">
            <h2 className=' text-4xl font-semibold '>Complete Website Responsive Design: from Figma to Webflow to Website Design</h2>
            <p className=' my-6 text-gray-800'>3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.</p>
            <div className=" flex justify-between mb-10">
                <div className=' flex gap-2.5 '>
                    <img src={instrc} alt="" />
                    <div>
                        <span className=' text-sm text-gray-700'>Created by:</span>
                        <p className='text-base font-semibold'>Dianne Russell</p>
                    </div>
                </div>
                {/* rating */}
                <div>

                </div>
            </div>
            <img src={courseImg} alt="" className='mb-10' />
            <h3 className='font-semibold text-2xl mb-5'>Description</h3>
            <p className=' text-sm text-gray-700 mb-5'>  For example, this is a Design course but I don't teach you Photoshop. Because Photoshop is needlessly complicated for Web Design. But people still teach it to web designers. I don't. I teach Figma – a simple tool that is taking over the design world. You will be designing a complete website within a week while others are still learning how to create basic layouts in Photoshop.</p>
            <p className=' text-sm text-gray-700 mb-10'>  Second, this is a Development course. But I don't teach you how to code. Because for Web Design coding is needlessly complicated and takes too long to learn. Instead, I teach Webflow – a tool that is taking over the web design world. You will be building complex websites within two weeks while others are still learning the basics of HTML & CSS. Third, this is a Freelancing course. But I don't just teach you how to write great proposals. I give you a winning proposal template. When you're done with the course, you will have a stunning portfolio website with portfolio pieces already in it. Buy this course now and take it whenever the time is right for you</p>
            <div className=' bg-[#E1F7E3] p-10 w-full mb-10'>
                <h3 className=' font-semibold text-2xl mb-5'>What you will learn in this course</h3>
                <div className=' grid grid-cols-2 gap-6'>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.</p>
                </div>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more.</p>
                </div>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>You will learn secret tips of Freelance Web Designers and how they make great money freelancing online.</p>
                </div>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>Learn to use Python professionally, learning both Python 2 and Python 3!</p>
                </div>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>Understand how to use both the Jupyter Notebook and create .py files</p>
                </div>
                <div className='flex gap-2'>
                    <img className='w-5 h-5' src={check} alt="" />
                    <p className='font-medium text-sm text-gray-700'>Get an understanding of how to create GUIs in the Jupyter Notebook system!</p>
                </div>
                </div>

            </div>
            <div className=' w-full mb-10'>
                <h3 className='font-semibold text-2xl mb-5'>Who this course is for:</h3>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>This course is for those who want to launch a Freelance Web Design career.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Praesent eget consequat elit. Duis a pretium purus.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Sed sagittis suscipit condimentum pellentesque vulputate feugiat libero nec accumsan.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel, lacinia quis ex.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Those who are looking to reboot their work life and try a new profession that is fun, rewarding and highly in-demand.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Nunc auctor consequat lorem, in posuere enim hendrerit sed.</p>
                </div>
                <div className=' flex gap-2 mb-3'>
                    <img src={arrow} alt="" className='w-6 h-6' />
                    <p className=' text-gray-700 font-sm text-base'>Duis ornare enim ullamcorper congue consectetur suspendisse interdum tristique est sed molestie.</p>
                </div>
            </div>
            <div className=' mb-10'>
                <h3 className='font-semibold text-2xl mb-5'>Course requirements</h3>
                <ul className=' list-disc ml-5 text-gray-700'>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    Nunc auctor consequat lorem, in posuere enim hendrerit sed.
                    </li>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    Sed sagittis suscipit condimentum pellentesque vulputate feugiat libero nec accumsan.
                    </li>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    Duis ornare enim ullamcorper congue consectetur suspendisse interdum tristique est sed molestie.
                    </li>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    Praesent eget consequat elit. Duis a pretium purus.
                    </li>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel, lacinia quis ex.
                    </li>
                    <li className='text-gray-700 font-sm text-base mb-3'>
                    This course is for those who want to launch a Freelance Web Design career.
                    </li>
                </ul>
            </div>
            <div>
                <div className=' w-full flex justify-between items-center mb-5'>
                    <h3 className='font-semibold text-2xl '>Curriculum</h3>
                    <div className=' flex items-center gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={folder} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>6 Sections</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>202 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>19h 37ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border  mb-4">
                <div className=' p-5 border-b'>
                   <div className='flex justify-between items-center cursor-pointer'>
                      <div className={' flex items-center gap-2  text-purple-600'} onClick={() => toggleAccordion(`module-1`)}>
                      <img src={arrowDown} alt="" />
                         <h2>Getting Started</h2>
                      </div>
                      <div className='flex justify-between items-center  gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>4 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>51m</span>
                        </div>
                      </div>
                   </div>  
                   { accordionStates[`module-1`] && (
                   <div className="mt-2">
                    <p className='text-sm text-gray-600 mb-2'>What’s is Webflow?</p>
                    <p className='text-sm text-gray-600 mb-2'>Sign up in Webflow</p>
                    <p className='text-sm text-gray-600 mb-2'>Webflow Terms & Conditions</p>
                    <p className='text-sm text-gray-600 mb-2'>Teaser of Webflow</p>
                    <p className='text-sm text-gray-600 mb-2'>Practice Project</p>
                   </div>
                   )}
                </div>
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Secret of Good Design</h2>
                      <div className='flex justify-between items-center  gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>52 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>5h 49m</span>
                        </div>
                      </div>
                </div>  
                    {accordionStates[`module-2`] && (
                    <div className="mt-2">
                       <p>What’s is Webflow?</p>
                    </div>
                    )}
                </div>
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Practice Design Like an Artist</h2>
                      <div className='flex justify-between items-center  gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>43 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>53m</span>
                        </div>
                      </div>
                </div>  
                    {accordionStates[`module-2`] && (
                    <div className="mt-2">
                       <p>What’s is Webflow?</p>
                    </div>
                    )}
                </div>
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Web Development (webflow) </h2>
                      <div className='flex justify-between items-center  gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>137 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>10h 6m</span>
                        </div>
                      </div>
                </div>  
                    {accordionStates[`module-2`] && (
                    <div className="mt-2">
                       <p>What’s is Webflow?</p>
                    </div>
                    )}
                </div>
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Secrets of Making Money Freelancing</h2>
                      <div className='flex justify-between items-center  gap-4'>
                        <div className='flex items-center gap-1.5'>
                            <img src={video} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>4 lectures</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <img src={clock} alt="" className=' w-5 h-5' />
                            <span className=' text-xs text-gray-600'>51m</span>
                        </div>
                      </div>
                </div>  
                    {accordionStates[`module-2`] && (
                    <div className="mt-2">
                       <p>What’s is Webflow?</p>
                    </div>
                    )}
                </div>

            </div>

        </div>
        {/* price div */}
        <div className=' shadow-md w-1/3 bg-white  h-max'>
        <div className='p-6 border-b'>
            <div className=' flex justify-between items-center mb-3'>
                <p className=' text-xl font-semibold'>$14.00</p>
                <p className=' py-1.5 px-3 bg-violet-200 text-xs text-violet-600'>56% off</p>
            </div>
            <div className=' flex items-center gap-2  '>
                <img src={alarm} alt="" />
                <p className='text-[#AF52DE] text-sm'>2 days left at this price!</p>
            </div>
        </div>
        <div className=' p-6 border-b'>
            <div className=' flex justify-between mb-4'>
                <div className=' flex gap-1'>
                <img src={clock} alt="" className=' w-5 h-5' />
                <p className='font-medium text-sm'>Course Duration</p>
                </div>
                <p className='font-normal text-xs text-gray-500'>6 Month</p>
            </div>
            <div className=' flex justify-between mb-4'>
                <div className=' flex gap-1 items-center'>
                <img src={level} alt="" className=' w-5 h-5' />
                <p className='font-medium text-sm'>Course Level</p>
                </div>
                <p className='font-normal text-xs text-gray-500'>Beginner</p>
            </div>
            <div className=' flex justify-between mb-4'>
                <div className=' flex gap-1 items-center'>
                <img src={user} alt="" className=' w-5 h-5' />
                <p className='font-medium text-sm'>Students Enrolled</p>
                </div>
                <p className='font-normal text-xs text-gray-500'>69,419,618</p>
            </div>
            <div className=' flex justify-between '>
                <div className=' flex gap-1 items-center'>
                <img src={lang} alt="" className=' w-5 h-5' />
                <p className='font-medium text-sm'>Language</p>
                </div>
                <p className='font-normal text-xs text-gray-500'>English</p>
            </div>
        </div>
        <div className=' p-6 border-b'>
        <button onClick={handlePurchase}  className=' w-full p-3 bg-violet-950 text-white'>Buy now</button>
        </div>
        <div className=' p-6 border-b'>
            <h3 className=' font-medium text-base mb-4'>This course includes:</h3>
            <div className=' flex gap-1 mb-3'>
                <img src={clock} alt="" className=' w-5 h-5' />
                <p className='font-medium text-[#AF52DE] text-sm'>Lifetime access</p>
            </div>
            <div className=' flex gap-1 mb-3'>
                <img src={lang} alt="" className=' w-5 h-5' />
                <p className='font-medium text-[#AF52DE] text-sm '>Free exercises file </p>
            </div>
            <div className=' flex gap-1 mb-3'>
                <img src={table} alt="" className=' w-5 h-5' />
                <p className='font-medium text-gray-500 text-sm '>Access on mobile , tablet  </p>
            </div>
            <div className=' flex gap-1 mb-3'>
                <img src={lang} alt="" className=' w-5 h-5' />
                <p className='font-medium text-[#AF52DE] text-sm '> downloadable resources </p>
            </div>
        </div>
        {isOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-1/2 h-1/2 p-6 flex flex-col justify-evenly rounded-lg shadow-lg ">
            <p className="text-3xl font-bold text-center mb-10">{message}</p>

            <div className="flex justify-center items-stretch gap-4 mt-4">
              {message === "Do you want to purchase this course?" ? (
                <>
                  <button 
                    onClick={confirmPayment} 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    YES
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                    Cancel
                  </button>
                </>
              ) : message === "Payment successful! Do you want to view the course or go to the dashboard?" ? (
                <>
                  <button 
                    onClick={() => alert("Redirecting to Course Page...")} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    View Course
                  </button>
                  <button 
                    onClick={() => alert("Redirecting to Dashboard...")} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Dashboard
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
    </section>
  )
}



