import React from "react";

interface Service {
  img: string;
  desc: string;
  price: string;
}

interface BusinessType {
  name: string;
  banner: string;
  rating: number;
  no_ratings: number;
  phone: string;
  link: string;
  location: string;
  map: string;
  address: string;
  services: {
    Events: Service;
    Wedding: Service;
    Birthday: Service;
    Festive: Service;
  };
}

interface ShopProps {
  description: string;      // Description of the business
  contactLink: string;      // Contact action link
  shareLink: string;        // Share action link
}

const ShopHome: React.FC<ShopProps> = ({ description, contactLink, shareLink }) => {
  const Business: BusinessType = {
    name: "Matrutwa Catering Services",
    banner: "https://images.pexels.com/photos/29060134/pexels-photo-29060134/free-photo-of-creative-beach-signage-with-coffee-and-arrow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.9,
    no_ratings: 75,
    phone: "9160118612",
    link: "https://pistahouse.in/",
    location: "Shop No 10 Plot No 32, Sector-2, Kopar Khairane, Navi Mumbai - 421709",
    map: "https://www.google.com/maps/place/Pista+House+-+Attapur/@17.3575539,78.4244801,17z/data=!4m6!3m5!1s0x3bcb971334667555:0xb68a7ea711dca126!8m2!3d17.3566748!4d78.4237783!16s%2Fg%2F11tf46wrrq?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
    address: "Shop No 10 Plot No 32, Sector-2, Kopar Khairane, Navi Mumbai - 421709",
    services: {
      Events: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-events-600082972-ar68etnb.jpg?w=1920&q=75",
        desc: "Full-service options including setup, serving, and cleanup.",
        price: "$500",
      },
      Wedding: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-wedding-600082974-t91qvn35.jpg?w=1920&q=75",
        desc: "Full-service options including setup, serving, and cleanup.",
        price: "$1000",
      },
      Birthday: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-birthday-600082968-2ndpnqtm.jpg?w=1920&q=75",
        desc: "Full-service options including setup, serving, and cleanup.",
        price: "$300",
      },
      Festive: {
        img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        desc: "Full-service options including setup, serving, and cleanup.",
        price: "$400",
      },
    },
  };

  const whatsappLink = `https://api.whatsapp.com/send/?phone=${Business.phone}&text=I+am+interested+in+your+services`;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Banner Image */}
      <div className="w-full h-60 bg-gray-200 rounded-xl overflow-hidden mb-5">
        <img
          src={Business.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center border-b pt-1 pb-1 mb-2">
        <h1 className="text-2xl font-semibold">{Business.name}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-green-600 text-lg font-semibold">{Business.rating}</span>
          <span className="text-gray-500">({Business.no_ratings} Ratings)</span>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <p className="text-gray-700 text-left">{Business.address}</p>
      </div>

      {/* Location and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        
        <div className="flex space-x-4 items-center">
          {/* Contact Button */}
          <a href={contactLink} className="flex items-center">
            <span role="img" aria-label="contact" className="text-xl mr-1">📞</span>
            <span className="text-gray-600">Contact</span>
          </a>
          {/* Share Button */}
          <a href={shareLink} className="flex items-center">
            <span role="img" aria-label="share" className="text-xl mr-1">🔗</span>
            <span className="text-gray-600">Share</span>
          </a>
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-2 rounded font-semibold text-white"
          >
            Order on Whatsapp
          </a>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Services Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {Object.entries(Business.services).map(([serviceKey, service]) => (
            <div
              key={serviceKey}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
            >
              <img src={service.img} alt={serviceKey} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{serviceKey}</h3>
                <p className="text-gray-600">{service.desc}</p>
                <p className="text-green-600 font-semibold mt-2">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopHome;
