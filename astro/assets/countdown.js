(() => {
  const markers = document.querySelectorAll("[data-tjstar-countdown]");
  if (!markers.length) return;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const eventTimeZone = "America/New_York";
  const dayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: eventTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const localDay = (timestamp) => {
    const parts = Object.fromEntries(
      dayFormatter
        .formatToParts(new Date(timestamp))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value])
    );
    return `${parts.year}-${parts.month}-${parts.day}`;
  };

  const update = () => {
    const now = Date.now();
    markers.forEach((marker) => {
      const eventTime = Date.parse(marker.dataset.tjstarCountdown);
      if (!Number.isFinite(eventTime)) return;

      const difference = eventTime - now;
      const currentDay = localDay(now);
      const eventDay = localDay(eventTime);
      if (currentDay > eventDay) {
        marker.textContent = "tjSTAR 2027 has concluded";
        return;
      }
      if (currentDay === eventDay && difference <= 0) {
        marker.textContent = "tjSTAR is today";
        return;
      }

      const days = Math.floor(difference / day);
      const hours = Math.floor((difference % day) / hour);
      const minutes = Math.floor((difference % hour) / minute);
      marker.textContent = `T−${days}d ${hours}h ${minutes}m`;
    });
  };

  update();
  window.setInterval(update, minute);
})();
