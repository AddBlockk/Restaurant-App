"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeolocationControl,
  TrafficControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";

export default function Maps() {
  const defaultState = {
    center: [46.355489228569915, 48.07389460345459],
    zoom: 17,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      id="map">
      <YMaps query={{ apikey: "c915b1b2-4f34-4cb0-99b8-a8a7ffed9b29" }}>
        <Map defaultState={defaultState} width="100%" height="50vh">
          <Placemark geometry={[46.355489228569915, 48.07389460345459]} />
          <FullscreenControl options={{ float: "left" }} />
          <ZoomControl />
          <GeolocationControl options={{ float: "right" }} />
          <TrafficControl />
        </Map>
      </YMaps>
    </motion.div>
  );
}
