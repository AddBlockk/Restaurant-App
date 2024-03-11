import Featured from "@/app/components/Featured";
import Map from "@/app/components/Map";
import Offer from "@/app/components/Offer";
import Slider from "@/app/components/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <Featured />
      <Offer />
      <Map />
    </>
  );
}
