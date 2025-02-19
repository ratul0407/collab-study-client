import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdBrightness7 } from "react-icons/md";
import { RiUserCommunityFill } from "react-icons/ri";

function WhyStudyHouse() {
  return (
    <div>
      <h3 className="pb-12 text-center text-3xl font-bold">Why Study House?</h3>
      <div className="flex flex-col items-center gap-8 md:gap-10 lg:flex-row lg:items-start">
        <div className="space-y-2 text-center md:w-1/2 lg:w-1/3">
          <MdBrightness7 size={35} className="mx-auto" />
          <h4 className="text-xl font-semibold">
            Seamless Learning Experience
          </h4>
          <p>
            {" "}
            Easily connect with expert tutors for interactive study sessions,
            whether free or paid, to enhance your learning at your own pace.
          </p>
        </div>
        <div className="space-y-2 text-center md:w-1/2 lg:w-1/3">
          <FaFileInvoiceDollar size={35} className="mx-auto" />
          <h4 className="text-xl font-semibold">Flexible and affordable</h4>
          <p>
            {" "}
            Choose from a variety of study sessions that fit your budget and
            schedule, ensuring accessible education for everyone.
          </p>
        </div>
        <div className="space-y-2 text-center md:w-1/2 lg:w-1/3">
          <RiUserCommunityFill size={35} className="mx-auto" />
          <h4 className="text-xl font-semibold">Engaging & Community-Driven</h4>
          <p>
            {" "}
            Join a thriving learning community where students and teachers
            collaborate, share knowledge, and grow together in a supportive
            environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyStudyHouse;
