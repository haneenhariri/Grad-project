import { lazy, Suspense } from "react";

// مكونات يتم تحميلها عند الطلب
const Hero = lazy(() => import("../../components/Hero/Hero"));
const Courses = lazy(() => import("../../components/Courses/Courses"));
const Instuctor = lazy(() => import("../../components/Instuctor/Instuctor"));
const Recommended = lazy(() => import("../../components/Recommended/Recommended"));
const TopCategory = lazy(() => import("../../components/TopCategory/TopCategory"));



export default function Home() {
  return (
    <>
      <div className="hero-wrapper overflow-hidden">
        <Suspense fallback={<div>Loading Hero...</div>}>
          <Hero />
        </Suspense>
      </div>

      <section className="px-4 lg:px-10 desktop:px-40">
        <Suspense fallback={<div>Loading Categories...</div>}>
          <TopCategory />
        </Suspense>

        <Suspense fallback={<div>Loading Courses...</div>}>
          <Courses />
        </Suspense>

        <Suspense fallback={<div>Loading Instructors...</div>}>
          <Instuctor />
        </Suspense>

        <Suspense fallback={<div>Loading Recommended...</div>}>
          <Recommended />
        </Suspense>
      </section>
    </>
  );
}
