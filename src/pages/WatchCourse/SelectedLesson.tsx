import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import fileIcon from '../../assets/Category/FileText (1).png'
export interface SelectedLessonProps
{
  selectedLesson : {
    id :number;
    course_id : number;
    title : string;
    description : string;
    files: FilesProp[];
  }
  completedLessons : Set<number>
  markLessonAsCompleted: (lessonId: number) => Promise<void>;
}
export interface FilesProp 
{
      id : number;
      lesson_id : number;
      path : string;
      origin_name : string;
      extension : string;
      type : string ;

}
export default function SelectedLesson({selectedLesson , completedLessons , markLessonAsCompleted } : SelectedLessonProps) {
  const { t } = useTranslation();
  const pdfFiles = selectedLesson.files.filter((f) => f.type === "file" && f.extension === "pdf");
  return (
    <div className=" rounded-lg  overflow-hidden mb-6">
       {selectedLesson.files && selectedLesson.files.length > 0 ? 
       (
        selectedLesson.files.map((file , index) => 
        {
          return(
            <div key={index} className="">
              {file.type === 'video' && (
                <video src={`http://127.0.0.1:8000/storage/${file.path}`}
                 controls
                 className="w-full h-auto"
                 onError={(e) => console.error("Video error:", e)}
                 onEnded={() => {
                 if (!completedLessons.has(selectedLesson.id)) {
                  markLessonAsCompleted(selectedLesson.id);
                  }
                }} />
              )}              
            </div>
          )
        })
       ):
       (  
       
       <div className="text-center text-gray-500">
          {t("No files available for this lesson")}
        </div>)}
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">{t("Lectures Description")}</h2>
          <p  id="Description" className="text-gray-700  mb-6">{selectedLesson.description}</p>
          {pdfFiles.map((file) => (
            <div key={file.id} className="md:p-6 p-2 flex justify-between items-center bg-gray-200 rounded-lg ">
              <div className=" flex items-center text-[#63066C] gap-2">
                <img src={fileIcon} alt="file" className="md:w-auto md:h-auto w-8 h-8" />
                <p className="md:text-base text-sm">{file.origin_name}</p>
              </div>
              <a
                href={`http://127.0.0.1:8000/storage/${file.path}`}
                download={file.origin_name}
                className=" bg-btn md:px-6 md:py-3  p-1 text-center md:text-base text-sm text-white hover:underline"
              >
                {t("Download File")}
              </a>
            </div>
          ))}
            {!completedLessons.has(selectedLesson.id) && (
              <Button text="Mark as Completed" Bg="bg-green-600 text-white hover:bg-green-700 transition-colors" onClick={() => markLessonAsCompleted(selectedLesson.id) }/>
            )}
        </div>
    </div>
  )
}
