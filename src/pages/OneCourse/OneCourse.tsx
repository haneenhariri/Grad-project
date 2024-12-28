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
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
 
export default function OneCourse() {
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
    <div className="px-4 py-20 lg:px-20 desktop:px-40 gap-6 flex">
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
            <p className=' text-sm text-gray-700 mb-5'>It gives you a huge self-satisfaction when you look at your work and say, "I made this!". I love that feeling after I'm done working on something. When I lean back in my chair, look at the final result with a smile, and have this little "spark joy" moment. It's especially satisfying when I know I just made $5,000.</p>
            <p className=' text-sm text-gray-700 mb-5'>  I do! And that's why I got into this field. Not for the love of Web Design, which I do now. But for the LIFESTYLE! There are many ways one can achieve this lifestyle. This is my way. This is how I achieved a lifestyle I've been fantasizing about for five years. And I'm going to teach you the same. Often people think Web Design is complicated. That it needs some creative talent or knack for computers. Sure, a lot of people make it very complicated. People make the simplest things complicated. Like most subjects taught in the universities. But I don't like complicated. I like easy. I like life hacks. I like to take the shortest and simplest route to my destination. I haven't gone to an art school or have a computer science degree. I'm an outsider to this field who hacked himself into it, somehow ending up being a sought-after professional. That's how I'm going to teach you Web Design. So you're not demotivated on your way with needless complexity. So you enjoy the process because it's simple and fun. So you can become a Freelance Web Designer in no time.</p>
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
                      <h2 className={ 'text-purple-600'} onClick={() => toggleAccordion(`module-1`)}>Getting Started</h2>
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
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Getting Started</h2>
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
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Getting Started</h2>
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
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Getting Started</h2>
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
                <div className=' p-5 border-b'>
                <div className='flex justify-between items-center cursor-pointer'>
                      <h2 className="" onClick={() => toggleAccordion(`module-2`)}>Getting Started</h2>
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
        <button onClick={() =>navigate(`/payment/${courseId}`)} className=' w-full p-3 bg-violet-950 text-white'>Buy now</button>
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
        </div>
    </div>
  )
}



