import { useTranslation } from "react-i18next";
import screenimg from "../../../src/assets/instructor/third.png";
import SmallThird from "../SmallThird/SmallThird";

export default function ThirdInstructor() {
  const { t } = useTranslation();

  return (
    <section className="px-4 lg:px-20 desktop:px-40 pt-24 flex justify-between">
      <img
        src={screenimg}
        alt="screen"
        className="w-1/3 hidden lg:block mr-20 "
      />
      <div className="w-full lg:w-1/2">
        <h3 className="text-center lg:text-start text-2xl mb-6">
          {t("instructor.whyStartTeaching.heading")}
        </h3>
        <p className="text-center lg:text-start text-sm mb-8 text-gray-500">
          {t("instructor.whyStartTeaching.paragraph")}
        </p>
        <SmallThird
          title={t("instructor.whyStartTeaching.feature1.title")}
          description={t("instructor.whyStartTeaching.feature1.description")}
        />
        <SmallThird
          title={t("instructor.whyStartTeaching.feature2.title")}
          description={t("instructor.whyStartTeaching.feature2.description")}
        />
        <SmallThird
          title={t("instructor.whyStartTeaching.feature3.title")}
          description={t("instructor.whyStartTeaching.feature3.description")}
        />{" "}
      </div>
    </section>
  );
}
