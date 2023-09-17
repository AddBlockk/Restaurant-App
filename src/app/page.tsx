import Featured from "@/components/Featured";
import Map from "@/components/Map";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
      <Map />
    </main>
  );
}
