import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrowseJobs = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#E7EAFC] pt-10 pb-14 sm:pt-16 sm:pb-20">
      <div className="flex flex-col justify-center items-center gap-y-3 sm:gap-y-4">
        <h2 className="text-2xl sm:text-4xl font-medium text-[#0000FF]">
          Browse Recent Jobs
        </h2>
        <div className="text-sm sm:text-lg text-gray-600 text-center px-4 sm:px-0">
          <p>Discover the latest job openings across various industries.</p>
          <p>Stay updated and be the first to apply.</p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-10 mt-8 sm:mt-10">
        <Slider {...settings}>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="max-w-full sm:max-w-[25.5rem] h-[17rem] sm:h-[15rem] bg-white px-4 sm:px-6 py-6 rounded-lg shadow mx-2"
            >
              <div className="flex justify-between px-2 sm:px-4">
                <p className="text-[#0000FF] text-sm sm:text-lg">
                  Software Engineer
                </p>
                <button className="bg-[#0000FF] text-white w-16 sm:w-20 text-xs sm:text-sm font-bold rounded-sm cursor-pointer">
                  APPLY
                </button>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm mt-10">
                <p className="text-center">
                  We are looking for Enrollment Advisors to take 30-35
                  calls/week. All leads are pre-scheduled.
                </p>
              </div>
              <div className="flex justify-around text-xs sm:text-sm mt-10 gap-1 sm:gap-2 ">
                <button className="bg-[#E7EAFC] w-24 sm:w-28 h-7 text-[#0000FF] rounded-sm">
                  Full Time
                </button>
                <button className="bg-[#E7EAFC] w-24 sm:w-28 h-7 text-[#0000FF] rounded-sm">
                  GH20K-50K
                </button>
                <button className="bg-[#E7EAFC] w-24 sm:w-28 h-7 text-[#0000FF] rounded-sm">
                  Accra
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BrowseJobs;
