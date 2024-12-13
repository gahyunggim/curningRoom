import { http, HttpResponse } from "msw";

import {
  initialCurningRooms,
  initialLocationList,
  initialStoneBallsInfo,
} from "./mockingData";

const apiUrl = import.meta.env.VITE_API_URL;

let curningRooms = initialCurningRooms;

let stoneBallsMonitoring = initialStoneBallsInfo;

export const handlers = [
  http.get(`/api/location`, ({ params }) => {
    console.log("Mocking request to:", `${apiUrl}/api/location`);
    return HttpResponse.json(initialLocationList);
  }),

  http.get(`/api/curningRoom/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json(curningRooms.find((room) => room.id === id));
  }),

  http.get(`/api/stoneBall/list`, ({ params }) => {
    return HttpResponse.json(
      initialLocationList.filter((location) => location.type === "stoneBall")
    );
  }),

  http.get(`/api/stoneBall/monitoring/log/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json(
      stoneBallsMonitoring.filter((ball) => ball.id === id)
    );
  }),

  http.get(`/api/stoneBall/monitoring/summary/:id`, ({ params }) => {
    const id = Number(params.id);

    const targetList = stoneBallsMonitoring.filter((ball) => ball.id === id);

    const highTemperature = targetList.reduce((acc, ball) => {
      return Math.max(acc, ball.temperature);
    }, 0);

    const lowTemperature = targetList.reduce((acc, ball) => {
      return Math.min(acc, ball.temperature);
    }, 100);

    const averageTemperature =
      targetList.reduce((acc, ball) => acc + ball.temperature, 0) /
      targetList.length;

    const midTemperature = (() => {
      // Extract temperatures and sort them in ascending order
      const sortedTemperatures = targetList
        .map((ball) => ball.temperature)
        .sort((a, b) => a - b);

      const len = sortedTemperatures.length;

      // Check if the length is odd or even
      if (len % 2 === 1) {
        // Odd length: Return the middle value
        return sortedTemperatures[Math.floor(len / 2)];
      } else {
        // Even length: Return the average of the two middle values
        const mid1 = sortedTemperatures[len / 2 - 1];
        const mid2 = sortedTemperatures[len / 2];
        return (mid1 + mid2) / 2;
      }
    })();

    return HttpResponse.json({
      temperature_high: highTemperature,
      temperature_low: lowTemperature,
      temperature_average: averageTemperature,
      temperature_middle: midTemperature,
    });
  }),

  http.get(`/api/stoneBall/log/:id`, ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json(
      stoneBallsMonitoring.filter((ball) => ball.id === id)
    );
  }),
];
