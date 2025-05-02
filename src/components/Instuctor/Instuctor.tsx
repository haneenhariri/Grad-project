import { useNavigate } from 'react-router-dom';
import instruct from '../../assets/Union.png'
import Button from '../../Ui/Button/Button'
import SectionsTitle from '../../Ui/SectionsTitle/SectionsTitle';
import { useTranslation } from 'react-i18next';

export default function Instuctor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleViewAllCourses = () => {
      navigate("/Instructor");
  }
  return (
    <section className=" my-20 flex items-center ">
      <div className=" w-1/2">
        <img src={instruct} alt="" className=' w-10/12' />
      </div>
      <div className=' w-1/2 flex flex-col justify-center items-center' >
        <SectionsTitle title='CoursesSection.Become'/>
        
        <p className=' mb-7.5 text-base w-10/12 text-center'>{t("Instructors")}</p>
          <Button text={"Start teaching"} Bg="bg-btn" textColor="text-white" onClick={handleViewAllCourses} />
      </div>
    </section>
  )
}
