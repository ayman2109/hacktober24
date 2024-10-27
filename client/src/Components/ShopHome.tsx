import { useState, useEffect } from "react";
function App() {
  interface Coordinates {
    latitude: number;
    longitude: number;
  }
  interface Place {
    name: string;
    country: string;
    distance: number;
  }

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError(`Error: ${error.message}`);
      }
    );
  };

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `http://geodb-free-service.wirefreethought.com/v1/geo/locations/${lat}+${lon}/nearbyPlaces?limit=5&offset=0&radius=100`
      );
      if (!response.ok) throw new Error("Failed to fetch nearby places");

      const data = await response.json();
      setPlaces(data.data[0]);
      console.log(data.data[0]); // Assumes the places data is in `data.data`
    } catch (error) {
      setError(`Error fetching nearby places: ${error}`);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchNearbyPlaces(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates]);

  const [selectedService, setSelectedService] = useState<string | null>(null);

  interface Review {
    rating: number;
    review: string;
    date: string;
  }

  interface BusinessType {
    name: string;
    banner: string;
    rating: number;
    no_ratings: number;
    phone: number;
    link: string;
    location: string;
    map: string;
    address: string;
    services: {
      [key: string]: {
        img: string;
        desc: string;
      };
    };
    reviews: Record<string, Review>; // Updated type for reviews
  }

  const Business: BusinessType = {
    name: "Matrutwa Catering Services",
    banner:
      "https://images.pexels.com/photos/29060134/pexels-photo-29060134/free-photo-of-creative-beach-signage-with-coffee-and-arrow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.9,
    no_ratings: 75,
    phone: 9391090496,
    link: "https://pistahouse.in/",
    location: "Mumbai",
    map: "https://www.google.com/maps/place/Pista+House+-+Attapur/@17.3575539,78.4244801,17z/data=!4m6!3m5!1s0x3bcb971334667555:0xb68a7ea711dca126!8m2!3d17.3566748!4d78.4237783!16s%2Fg%2F11tf46wrrq?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
    address:
      "Shop No 10 Plot No 32, Sector-2, Kopar Khairane, Navi Mumbai - 421709",
    services: {
      Events: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-events-600082972-ar68etnb.jpg?w=1920&q=75",
        desc: "Many caterers provide full-service options, which include setup, serving, and cleanup, allowing clients to focus on enjoying their event without worrying about the details. They also work in collaboration with event planners to ensure a seamless experience from start to finish. This comprehensive service enhances guest satisfaction and creates a professional atmosphere that reflects well on the host.",
      },
      Wedding: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-wedding-600082974-t91qvn35.jpg?w=1920&q=75",
        desc: "Many caterers provide full-service options, which include setup, serving, and cleanup, allowing clients to focus on enjoying their event without worrying about the details. They also work in collaboration with event planners to ensure a seamless experience from start to finish. This comprehensive service enhances guest satisfaction and creates a professional atmosphere that reflects well on the host.",
      },
      Birthday: {
        img: "https://images.jdmagicbox.com/quickquotes/images_main/caterer-for-birthday-600082968-2ndpnqtm.jpg?w=1920&q=75",
        desc: "Many caterers provide full-service options, which include setup, serving, and cleanup, allowing clients to focus on enjoying their event without worrying about the details. They also work in collaboration with event planners to ensure a seamless experience from start to finish. This comprehensive service enhances guest satisfaction and creates a professional atmosphere that reflects well on the host.",
      },
      Festive: {
        img: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        desc: "Many caterers provide full-service options, which include setup, serving, and cleanup, allowing clients to focus on enjoying their event without worrying about the details. They also work in collaboration with event planners to ensure a seamless experience from start to finish. This comprehensive service enhances guest satisfaction and creates a professional atmosphere that reflects well on the host.",
      },
    },
    reviews: {
      Allen: {
        rating: 4.5,
        review: "These guys got a noice service goin on",
        date: "15 Aug 2024",
      },
      Arakeen: {
        rating: 4.9,
        review: "These guys got a legandary service goin on",
        date: "16 Oct 2104",
      },
      Zoro: {
        rating: 4.1,
        review: "I'm Lost? No, you're probably scaring me!",
        date: "6 Aug 2023",
      },
    },
  };
  var whatsapp =
    // "https://wa.me/+91" +Business.phone +"?text=i%20want%20to%20order%20a%20phone";
    // "https://api.whatsapp.com/send/?phone=" +Business.phone +"&text=i%20want%20to%20order%20a%20phone";
    "https://api.whatsapp.com/send/?phone=" +
    Business.phone +
    "&text=i+want+to+order+a+phone";
  var share = "https://wa.me/?text=" + Business.link;
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Banner Image */}
      <div className="w-full h-60 bg-gray-200 rounded-xl overflow-hidden mb-5">
        <img
          src={Business.banner} // Use Business.banner
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center border-b pt-1 pb-1 mb-2">
        <h1 className="text-2xl font-semibold">{Business.name}</h1>{" "}
        {/* Use Business.name */}
        <div className="flex items-center space-x-2">
          <span className="text-green-600 text-lg font-semibold">
            {Business.rating}
          </span>{" "}
          {/* Use Business.rating */}
          <span className="text-gray-500">
            ({Business.no_ratings} Ratings)
          </span>{" "}
          {/* Use Business.no_ratings */}
          <button className="bg-green-500 text-white px-1 py-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
            </svg>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
          </svg>
        </div>
      </div>

      {/* Contact and Address Section */}
      <div className="flex justify-between">
        <div className="space-y-4">
          <button className="bg-green-500 p-2 rounded font-semibold">
            <svg
              className="bg-green-500 "
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
            </svg>
          </button>
          <button className="bg-blue-500 p-2 rounded ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
            </svg>
          </button>
          <a href={whatsapp} target="_blank">
            <button className="bg-green-500 px-3 py-2 rounded ml-2">
              <svg
                className="my-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                height="16px"
                width="16px"
                viewBox="0 0 308 308"
              >
                <path d="M227.9 176.98c-.6-.29-23.05-11.34-27.04-12.78-1.63-.58-3.37-1.16-5.23-1.16-3.03 0-5.58 1.51-7.56 4.48-2.24 3.33-9.03 11.27-11.13 13.64-.27.31-.65.69-.87.69-.2 0-3.68-1.43-4.73-1.89-24.09-10.46-42.37-35.62-44.88-39.87-.36-.61-.37-.89-.38-.89.09-.32.9-1.13 1.32-1.55 1.22-1.21 2.55-2.8 3.83-4.35.6-.73 1.22-1.46 1.81-2.15 1.86-2.16 2.69-3.84 3.65-5.79l.5-1.01c2.34-4.66.34-8.59-.31-9.86-.53-1.06-10.01-23.94-11.02-26.35-2.42-5.8-5.63-8.5-10.08-8.5-.41 0 0 0-1.73.07-2.11.09-13.59 1.6-18.67 4.8-5.39 3.4-14.5 14.22-14.5 33.25 0 17.13 10.87 33.3 15.54 39.45.12.16.33.47.64.92 17.87 26.1 40.15 45.45 62.74 54.47 21.75 8.69 32.04 9.69 37.9 9.69h.01c2.46 0 4.43-.19 6.17-.36l1.1-.1c7.51-.67 24.02-9.22 27.78-19.66 2.96-8.22 3.74-17.2 1.77-20.46-1.79-2.96-4.12-4.08-7.06-5.49zM156.73 0C73.32 0 5.45 67.35 5.45 150.14c0 26.78 7.16 52.99 20.74 75.93L.21 302.72c-.48 1.43-.12 3.01.93 4.08.76.78 1.79 1.2 2.83 1.2.41 0 .82-.06 1.21-.19l79.92-25.4c21.87 11.69 46.59 17.85 71.6 17.85 83.4 0 151.27-67.35 151.27-150.14C308 67.35 240.14 0 156.73 0zm0 268.99c-23.54 0-46.34-6.8-65.94-19.66-.66-.43-1.42-.65-2.19-.65-.41 0-.82.06-1.21.19l-40.04 12.73 12.92-38.13c.42-1.23.21-2.6-.56-3.65-14.92-20.39-22.81-44.49-22.81-69.68 0-65.54 53.75-118.87 119.82-118.87 66.06 0 119.81 53.32 119.81 118.87-.02 65.54-53.76 118.87-119.82 118.87z" />
              </svg>
            </button>
          </a>
          <a href={share} target="_blank">
            <button className="bg-blue-500 p-2 rounded ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
              </svg>
            </button>
          </a>

          <div style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
            <p className="text-gray-600">Address: {Business.address}</p>{" "}
            {/* Use Business.address */}
          </div>
        </div>
        <div className="m-4">
          <button className="bg-yellow-300 p-2 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0"
            >
              <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </button>
          <button className="bg-yellow-300 p-2 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0"
            >
              <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </button>
          <button className="bg-yellow-300 p-2 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0"
            >
              <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </button>
          <button className="bg-yellow-300 p-2 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0"
            >
              <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </button>
          <button className="bg-yellow-300 p-2 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0"
            >
              <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        {/* Price List Section */}
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-4">Price List</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Object.keys(Business.services).map((key) => (
              <div
                key={key}
                className="min-w-[250px] bg-gray-100 p-4 flex items-center gap-2 rounded-xl shadow"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={
                      Business.services[key as keyof typeof Business.services]
                        .img
                    }
                    alt={key}
                    className="w-32 h-32 object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div>
                  <p className="font-semibold">Caterer for {key}</p>
                  <button
                    onClick={() => setSelectedService(key)}
                    className="text-blue-500 mt-2 block"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Detail Card Section */}
          {selectedService && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold">
                    {selectedService} Details
                  </h3>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                </div>
                <hr style={{ borderWidth: "1px", borderColor: "#ababab" }} />
                <br />
                <img
                  src={
                    Business.services[
                      selectedService as keyof typeof Business.services
                    ].img
                  }
                  alt={selectedService}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p>
                  {
                    Business.services[
                      selectedService as keyof typeof Business.services
                    ].desc
                  }
                </p>
              </div>
            </div>
          )}
          <br />
          <hr />
          <hr />
          <br />
          <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
          <div className="flex">
            <div className="max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] bg-green-200 p-4 m-1 flex items-center text-center gap-2 rounded-xl shadow">
              <h1 className="m-auto font-bold text-4xl">{Business.rating}</h1>
            </div>
            <div className="ml-3 mt-4">
              <h2 className="m-auto font-bold text-3xl">
                {Business.no_ratings} Ratings
              </h2>

              <h3 className="m-auto mt-2 font-semibold text-l">
                Based on {Business.no_ratings} Ratings across the web
              </h3>
            </div>
          </div>
          <br /> <hr /> <hr /> <br />
          <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
          <div>
            {Object.keys(Business.reviews).map((key, index) => (
              <div key={index} className="bg-gray-100 p-4 mb-4 rounded shadow">
                {/* Name, Rating, and Date Row */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{key}</p>
                    <span className="text-yellow-500">
                      ⭐ {Business.reviews[key].rating}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {Business.reviews[key].date}
                  </p>
                </div>

                {/* Review Text Row */}
                <p className="mt-2 text-gray-700">
                  {Business.reviews[key].review}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Quick Information</h2>
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <hr />
            <hr />
            <p className="mt-2 font-semibold">+91 {Business.phone}</p>
            <h3 className="text-xl font-semibold mt-5 mb-4">Address</h3>
            <hr />
            <hr />
            <p className="mt-2">
              A C Patil Colleage Of Engineering, Sector 4, Kharghar, Navi Mumbai
              - 410210
            </p>
            <h3 className="text-xl font-semibold mt-5 mb-4">Directions</h3>
            <hr />
            <hr />
            <a href={Business.map} target="_blank" className="">
              <button className="mt-2 mb-4 flex text-lg text-blue-500 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#3b82f6"
                >
                  <path d="M360-120q-66 0-113-47t-47-113v-327q-35-13-57.5-43.5T120-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 69.5T280-607v327q0 33 23.5 56.5T360-200q33 0 56.5-23.5T440-280v-400q0-66 47-113t113-47q66 0 113 47t47 113v327q35 13 57.5 43.5T840-240q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-327q0-33-23.5-56.5T600-760q-33 0-56.5 23.5T520-680v400q0 66-47 113t-113 47ZM240-680q17 0 28.5-11.5T280-720q0-17-11.5-28.5T240-760q-17 0-28.5 11.5T200-720q0 17 11.5 28.5T240-680Zm480 480q17 0 28.5-11.5T760-240q0-17-11.5-28.5T720-280q-17 0-28.5 11.5T680-240q0 17 11.5 28.5T720-200ZM240-720Zm480 480Z" />
                </svg>
                Route
              </button>
            </a>

            {/* Location and Nearby Places */}
            <div className="col-span-1">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              {coordinates ? (
                <>
                  <p>
                    Latitude: {coordinates.latitude}, Longitude:{" "}
                    {coordinates.longitude}
                  </p>
                  <h3>Nearby Places:</h3>
                  {places.length > 0 ? (
                    <ul>
                      {places.map((place, index) => (
                        <li key={index}>
                          {place.name}, {place.country} - {place.distance} km
                          away
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No nearby places found.</p>
                  )}
                </>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Loading location...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
