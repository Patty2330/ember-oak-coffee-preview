(function () {
  "use strict";

  var dataEl = document.getElementById("hours-data");
  if (!dataEl) return;

  var hours;
  try {
    hours = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }
  if (!hours || !hours.length) return;

  var timezone = dataEl.getAttribute("data-timezone") || "America/Chicago";

  function chicagoParts(date) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(date);
    var out = {};
    parts.forEach(function (p) {
      if (p.type !== "literal") out[p.type] = p.value;
    });
    return out;
  }

  var dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function lookup(jsDay) {
    for (var i = 0; i < hours.length; i++) {
      if (Number(hours[i].js_day) === jsDay) return hours[i];
    }
    return null;
  }

  function toMinutes(hhmm) {
    var bits = String(hhmm).split(":");
    return parseInt(bits[0], 10) * 60 + parseInt(bits[1], 10);
  }

  var now = chicagoParts(new Date());
  var todayNum = dayMap[now.weekday];
  if (todayNum === undefined) return;

  var currentMinutes = parseInt(now.hour, 10) * 60 + parseInt(now.minute, 10);
  var today = lookup(todayNum);
  if (!today) return;

  var openM = toMinutes(today.open_24h);
  var closeM = toMinutes(today.close_24h);
  var isOpen = currentMinutes >= openM && currentMinutes < closeM;

  var statusEls = document.querySelectorAll("[data-hours-status]");
  var labelEl = document.querySelector("[data-hours-label]");

  function nextOpen() {
    for (var offset = isOpen ? 1 : 0; offset <= 7; offset++) {
      var day = (todayNum + offset) % 7;
      var row = lookup(day);
      if (!row) continue;
      if (offset === 0 && currentMinutes < toMinutes(row.open_24h)) return row;
      if (offset > 0) return row;
    }
    return null;
  }

  var statusText;
  var openState;
  if (isOpen) {
    statusText = "Open now, until " + today.close;
    openState = "true";
  } else {
    var nxt = nextOpen();
    if (nxt) {
      var when = Number(nxt.js_day) === todayNum ? "today" : nxt.day;
      statusText = "Closed now · Opens " + when + " at " + nxt.open;
    } else {
      statusText = "See hours below";
    }
    openState = "false";
  }
  statusEls.forEach(function (statusEl) {
    statusEl.textContent = statusText;
    statusEl.setAttribute("data-open", openState);
  });

  if (labelEl && today) {
    labelEl.textContent = "Today, " + today.day + ": " + today.open + "–" + today.close;
  }

  document.querySelectorAll("[data-hours-day]").forEach(function (row) {
    if (Number(row.getAttribute("data-hours-day")) === todayNum) {
      row.classList.add("is-today");
      var tag = row.querySelector(".hours-today-tag");
      if (tag) tag.hidden = false;
    }
  });
})();
