import Hero from "../Components/Hero";
import Pocket from "../Components/Pocket";
import Searchbox from "../Components/Searchbox";
import ServiceGrid from "../Components/Services";
import ShopCard from "../Components/ShopCard";




export default function Home() {
  return (
    <>
    <Searchbox/>
    <ServiceGrid/>
    <Hero/>
    <Pocket/>
    <div >

    <ShopCard
        name="Best Western Ashoka"
        location="Lakdi Ka Pool-khairatabad, Hyderabad"
        rating="4.0"
        mobile="08147863485"
        imageSrc='/images/image5.jpeg'
        rating_no="15,879"
      />
          <ShopCard
        name="Best Western Ashoka"
        location="Lakdi Ka Pool-khairatabad, Hyderabad"
        rating="4.0"
        mobile="08147863485"
        imageSrc='/images/image5.jpeg'
        rating_no="15,879"
      />
      
      <ShopCard
        name="Best Western Ashoka"
        location="Lakdi Ka Pool-khairatabad, Hyderabad"
        rating="4.0"
        mobile="08147863485"
        imageSrc='/images/image5.jpeg'
        rating_no="15,879"
      />
          <ShopCard
        name="Best Western Ashoka"
        location="Lakdi Ka Pool-khairatabad, Hyderabad"
        rating="4.0"
        mobile="08147863485"
        imageSrc='/images/image5.jpeg'
        rating_no="15,879"
      />
    </div>
    </>
  )
}
