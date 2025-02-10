import Header from "./components/Header";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="h-[60vh] w-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/Tiger-Male-CJ-Walking-Waterfall-JEP_8986.jpg')" }}>
        <div className="w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="flex items-center justify-center text-center flex-col text-white gap-4">
            <h1 className="text-4xl font-bold">Discover Wildlife Wonders</h1>
            <p className="text-2xl">Experience nature's marvels in the heart of the city</p>
            <Link href="/daytickets"><button type="button" className="bg-[#41583E] py-3 px-8 rounded-xl text-2xl hover:bg-[#394e37]">Buy Tickets Now</button></Link>
          </div>
        </div>
      </div>
      <div>
      <div className="py-16 p-6 bg-[#364934] w-screen h-[40vh]">
        <div className="max-w-6xl min-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="h-40 rounded-lg mb-4 bg-cover bg-center" style={{backgroundImage: "url('/encounter.jpg')"}} />
            <h3 className="text-xl font-bold text-[#41583E] mb-2">Animal Experiences</h3>
            <p className="text-gray-600">Get up close with our amazing animal encounters</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="h-40 rounded-lg mb-4 bg-cover bg-center" style={{backgroundImage: "url('/feeding.jpeg')"}} />
            <h3 className="text-xl font-bold text-[#41583E] mb-2">Daily Events</h3>
            <p className="text-gray-600">Check out our feeding times and educational talks</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="h-40 rounded-lg mb-4 bg-cover bg-center" style={{backgroundImage: "url('/educationalTalk.jpeg')"}} />
            <h3 className="text-xl font-bold text-[#41583E] mb-2">Conservation</h3>
            <p className="text-gray-600">Learn about our wildlife educational talks</p>
          </div>
        </div>
      </div>

      <div className="w-screen bg-[#41583E] h-[20vh]">
        <div className="w-full flex flex-row justify-around items-center gap-8">
          <div className="text-white flex flex-col py-8 gap-4">
            <h3 className="text-xl">Contact Us</h3>
            <ul className="">
              <li>123 sigma lane</li>
              <li>Skibidi City, SG 12345</li>
              <li>Phone: +44 123-4567</li>
            </ul>
          </div>
          <div className="text-white flex flex-col py-8 gap-4">
            <h3 className="text-xl">Follow us</h3>
            <ul className="flex flex-row gap-4 text-xl">
              <li><FaFacebook/></li>
              <li><FaInstagram/></li>
              <li><FaYoutube/></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
