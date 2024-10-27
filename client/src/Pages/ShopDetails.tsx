import ReviewBox from "../Components/Review";
import ShopHome from "../Components/ShopHome";


export default function ShopDetails() {
    const description = "We provide top-notch catering services for all your events, ensuring quality and satisfaction.";
  const contactLink = "tel:9160118612"; 
  const shareLink = "https://example.com";
  const reviews = [
    {
      name: "Nithiya",
      imageUrl: "https://profile.justdial.com/profileImg?i=htvMAqr%2FBBzT0iOnQdtu54Q%2FqZjqEuRUzPZn8TjsGA4%3D",
      reviewCount: 2,
      reviewText: "Excellent",
      initialRating: 3,
    },
    {
      name: "John Doe",
      imageUrl: "https://profile.justdial.com/profileImg?i=9pEXrdDuxkZWkXy94QXeGvrxaB822Z%2Bnp4FE0zmUhhM%3D",
      reviewCount: 5,
      reviewText: "Very good service!",
      initialRating: 4,
    },
    {
      name: "Jane Smith",
      imageUrl: "https://profile.justdial.com/profileImg?i=yQpmFEypSeqtkc1l%2FCZumw%2BArywnveL1oGfu8P3af10%3D",
      reviewCount: 3,
      reviewText: "Had a great experience.",
      initialRating: 5,
    },
    {
      name: "Aakif",
      imageUrl: "https://profile.justdial.com/profileImg?i=VvieJ%2Bw56aEWWMMcxHwLa4MYj2%2FlWh%2FnwfqSePktTJU%3D",
      reviewCount: 9,
      reviewText: "You should check it once.",
      initialRating: 4,
    },
    {
      name: "Jane Smith",
      imageUrl: "https://profile.justdial.com/profileImg?i=m3d5uRia6xvDEsce5KqnFWwGBrVGzxHhKm4%2B5E0WZaY%3D",
      reviewCount: 3,
      reviewText: "Had a great experience.",
      initialRating: 5,
    },
  ];
  return (
    <>

<ShopHome description={description} contactLink={contactLink} shareLink={shareLink} />
    
<div className="space-y-4 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <ReviewBox
            key={index}
            name={review.name}
            imageUrl={review.imageUrl}
            reviewCount={review.reviewCount}
            reviewText={review.reviewText}
            initialRating={review.initialRating}
          />
        ))}
      </div>
    </>
  )
}
