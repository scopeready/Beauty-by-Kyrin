(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = header?.classList.toggle("menu-open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header?.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const setupScrollJourney = () => {
    if (reducedMotion.matches) return () => {};

    const journey = document.querySelector("[data-scroll-journey]");
    const media = journey?.querySelector(".journey-media");
    const video = journey?.querySelector(".journey-video");
    if (!journey || !media || !video) return () => {};

    const controller = new AbortController();
    const useMobile = window.matchMedia("(max-width: 720px)").matches;
    const source = useMobile
      ? video.dataset.mobileSrc
      : video.dataset.desktopSrc;
    if (useMobile && video.dataset.mobilePoster) {
      video.poster = video.dataset.mobilePoster;
      const poster = journey.querySelector(".journey-poster");
      if (poster?.dataset.mobilePoster) poster.src = poster.dataset.mobilePoster;
    }
    let blobUrl = "";
    let duration = 0;
    let frame = 0;
    let requestedTime = 0;
    let painted = false;

    const progress = () => {
      const rect = journey.getBoundingClientRect();
      const range = Math.max(1, journey.offsetHeight - window.innerHeight);
      return Math.min(1, Math.max(0, -rect.top / range));
    };

    const paint = () => {
      frame = 0;
      if (!duration || video.readyState < 2) return;
      const next = requestedTime * duration;
      if (Math.abs(video.currentTime - next) > 0.045) video.currentTime = next;
    };

    const requestPaint = () => {
      requestedTime = progress();
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const markPainted = () => {
      if (painted) return;
      painted = true;
      media.classList.add("is-video-ready");
    };

    const loadVideo = async () => {
      if (!source) return;
      try {
        const response = await fetch(source, { signal: controller.signal });
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        const blob = await response.blob();
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();
      } catch (error) {
        if (error.name !== "AbortError") console.warn("Hero film unavailable; poster remains visible.");
      }
    };

    video.addEventListener("loadedmetadata", () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      requestPaint();
    });
    video.addEventListener("loadeddata", markPainted, { once: true });
    video.addEventListener("seeked", markPainted, { once: true });
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint, { passive: true });
    loadVideo();

    return () => {
      controller.abort();
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      if (frame) window.cancelAnimationFrame(frame);
      video.removeAttribute("src");
      video.load();
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  };

  let teardownJourney = setupScrollJourney();
  const handleMotionChange = () => {
    teardownJourney();
    teardownJourney = setupScrollJourney();
  };
  reducedMotion.addEventListener?.("change", handleMotionChange);
  window.addEventListener("pagehide", () => teardownJourney(), { once: true });

  document.querySelectorAll(".service-row").forEach((row) => {
    row.addEventListener("toggle", () => {
      if (!row.open) return;
      document.querySelectorAll(".service-row").forEach((other) => {
        if (other !== row) other.open = false;
      });
    });
  });

  const form = document.querySelector("[data-booking-form]");
  const status = document.querySelector("[data-form-status]");

  const clearErrors = () => {
    form?.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
    form?.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  };

  const showFieldError = (field, message) => {
    field.setAttribute("aria-invalid", "true");
    const error = document.getElementById(`${field.id}-error`);
    if (error) error.textContent = message;
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    status.className = "form-status";
    status.textContent = "";

    const required = [...form.querySelectorAll("[required]")];
    let valid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        showFieldError(field, "This field is required.");
        valid = false;
      } else if (field.type === "email" && !field.validity.valid) {
        showFieldError(field, "Enter a valid email address.");
        valid = false;
      }
    });

    if (!valid) {
      status.classList.add("is-error");
      status.textContent = "Please review the highlighted fields.";
      form.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    const submit = form.querySelector(".submit-stamp");
    const label = submit.querySelector("span");
    const originalLabel = label.textContent;
    submit.disabled = true;
    label.textContent = "Sending";
    status.textContent = "Sending your request to Kyrin.";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Request failed");
      form.reset();
      status.classList.add("is-success");
      status.textContent = "Your request is on its way. Kyrin will be in touch soon.";
    } catch {
      status.classList.add("is-error");
      status.textContent = "The form could not send. Please call or text 702-533-8176.";
    } finally {
      submit.disabled = false;
      label.textContent = originalLabel;
    }
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
