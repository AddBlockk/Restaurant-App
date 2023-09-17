"use client";

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
  {
    return (
      <div id="map">
        <YMaps>
          <Map defaultState={defaultState} width="100%" height="50vh">
            <Placemark geometry={[46.355489228569915, 48.07389460345459]} />
            <FullscreenControl options={{ float: "left" }} />
            <ZoomControl options={{ float: "left" }} />
            <GeolocationControl options={{ float: "right" }} />
            <TrafficControl options={{ float: "right" }} />
          </Map>
        </YMaps>
      </div>
    );
  }
}
