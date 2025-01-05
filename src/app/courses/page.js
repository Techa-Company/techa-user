import Image from "next/image";
import Link from "next/link";

export default function Courses() {

  const images = [
    "/images/sql.webp",
    "/images/sql-2.jpg",
    "/images/React.jpg",
    "/images/htmlcss.jpeg",
    "/images/tailwind.jpg",
    "/images/js.png",
  ];

  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="tracking-tighter font-extrabold text-[#042A1B] text-3xl">
          دوره های ما
        </h1>
        <div className="grid gap-10 mt-10 lg:px-10">
          {[...Array(6)].map((_, index) => {
            return (
              <div key={index} className="custom-shadow rounded-3xl flex flex-col md:flex-row p-5">
                <Image src={images[index]} className="rounded-3xl w-full sm:min-w-80 sm:w-fit" width={350} height={10} alt="banner" />
                <div className="text-[#042A1B] p-5">
                  <h3 className="mb-3 text-2xl font-extrabold">دوره JavaScript</h3>
                  <p className="text-sm tracking-tighter text-justify leading-7">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                  </p>
                  <div className="grid grid-cols-2 gap-5 text-center mt-5 w-60">
                    <Link className="text-sm font-normal tracking-tighter bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href={`courses/${String(index + 1)}`}>
                      مشاهده دوره
                    </Link>
                    <Link className="text-sm font-normal tracking-tighter bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href="">
                      اجرای بر خط
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
}
