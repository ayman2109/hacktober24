import React from 'react';

const Pocket: React.FC = () => {
    const cards = [
        {
            title: "Noteworthy technology acquisitions 2021",
            description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
            image: '/images/image1.jpg',
            link: "#"
        },
        {
            title: "Innovative AI Trends",
            description: "Explore the latest trends in artificial intelligence and how they are shaping our future.",
            image: "/images/image2.avif",
            link: "#"
        },
        {
            title: "The Rise of Quantum Computing",
            description: "An overview of the advancements in quantum computing and its potential impact on technology.",
            image: "/images/image3.webp",
            link: "#"
        },
        {
            title: "Sustainable Tech Solutions",
            description: "Discover innovative technologies that are helping to promote sustainability.",
            image: '/images/image4.webp',
            link: "#"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
                >
                    <a href={card.link}>
                        <img className="rounded-t-lg w-full h-48 object-cover" src={card.image} alt={card.title} />
                    </a>
                    <div className="p-5">
                        <a href={card.link}>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
                        <a href={card.link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Pocket;
