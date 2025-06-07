import SmallFourth from "../SmallFourth/SmallFourth";
import pic1 from "../../../src/assets/instructor/icons/NewspaperClipping.png";
import pic2 from "../../../src/assets/instructor/icons/IdentificationCard.png";
import pic3 from "../../../src/assets/instructor/icons/PlayCircle.png";
import pic4 from "../../../src/assets/instructor/icons/Handshake.png";
import { useTranslation } from "react-i18next";

export default function FourthInstrucor() {
  const { t } = useTranslation();

  return (
    <section className="px-4 lg:px-20 desktop:px-40 bg-purpl-100  py-20  flex flex-col justify-between items-center ">
      <h3 className="text-3xl text-center lg:w-1/3 mb-10">
        {t("instructor.instructorSteps.header")}
      </h3>
      <div className="flex gap-3 flex-wrap lg:flex-nowrap justify-between">
        <SmallFourth
          pic={pic1}
          alt={t("instructor.instructorSteps.step1.title")} // أو نص ثابت مثل: "NewspaperClipping"
          title={t("instructor.instructorSteps.step1.title")}
          desribtion={t("instructor.instructorSteps.step1.description")}
          color="bg-slate-200"
        />

        <SmallFourth
          pic={pic2}
          alt={t("instructor.instructorSteps.step2.title")}
          title={t("instructor.instructorSteps.step2.title")}
          desribtion={t("instructor.instructorSteps.step2.description")}
          color="bg-pink-100"
        />

        <SmallFourth
          pic={pic3}
          alt={t("instructor.instructorSteps.step3.title")}
          title={t("instructor.instructorSteps.step3.title")}
          desribtion={t("instructor.instructorSteps.step3.description")}
          color="bg-yellow-100"
        />

        <SmallFourth
          pic={pic4}
          alt={t("instructor.instructorSteps.step4.title")}
          title={t("instructor.instructorSteps.step4.title")}
          desribtion={t("instructor.instructorSteps.step4.description")}
          color="bg-sky-100"
        />
      </div>
    </section>
  );
}
