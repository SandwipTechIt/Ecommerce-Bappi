// src/hooks/useFbEvent.js
import { sendServerEvent } from '../utils/fbq';

export default function useFbEvent() {
  const fire = (eventName, customData = {}) => {
    sendServerEvent(eventName, customData);
  };

  return { fire };
}