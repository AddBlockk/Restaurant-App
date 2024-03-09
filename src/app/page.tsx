import Featured from "@/app/components/Featured";
import Map from "@/app/components/Map";
import Offer from "@/app/components/Offer";
import Slider from "@/app/components/Slider";
import DefaultLayout from "./(pages)/_layout/default";

export default function Home() {
  return (
    <DefaultLayout>
      <Slider />
      <Featured />
      <Offer />
      <Map />
    </DefaultLayout>
  );
}
