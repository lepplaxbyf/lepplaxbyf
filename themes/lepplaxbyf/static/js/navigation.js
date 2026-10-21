(() => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  if (!(toggle instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) return;

  const mobileNavigation = window.matchMedia("(max-width: 760px)");
  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    navigation.classList.toggle("is-open", expanded);
    navigation.hidden = mobileNavigation.matches && !expanded;
  };

  const updateMenuVisibility = () => {
    toggle.hidden = !mobileNavigation.matches;
    setExpanded(false);
  };

  updateMenuVisibility();
  mobileNavigation.addEventListener("change", updateMenuVisibility);

  toggle.addEventListener("click", () => {
    setExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) setExpanded(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setExpanded(false);
  });

  document.addEventListener("click", (event) => {
    if (!toggle.contains(event.target) && !navigation.contains(event.target)) setExpanded(false);
  });
})();
