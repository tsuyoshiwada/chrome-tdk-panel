(function() {
  const ID = "__tdk-panel__";

  function $(selector) {
    return document.querySelector(selector);
  }

  function setStyles($el, props) {
    Object.keys(props).forEach(prop => {
      $el.style[prop] = props[prop];
    });
  }

  function createElement(tagName, html, styles) {
    const $el = document.createElement(tagName);
    $el.innerHTML = html;
    setStyles($el, styles);
    return $el;
  }

  function createRowElement(title, content) {
    const $el = createElement("div", "", {
      color: "#333",
      fontFamily: "sans-serif",
      fontWeight: "normal",
      fontSize: "14px"
    });

    const $strong = createElement("strong", title, {
      display: "inline-block",
      width: "100px",
      textAlign: "right",
      fontWeight: "bold"
    });

    const $span = createElement("span", content, {});

    $el.appendChild($strong);
    $el.appendChild($span);

    return $el;
  }

  function removePanel() {
    document.body.removeChild($(`#${ID}`));
  }

  function addPanel() {
    const $panel = createElement("div", "", {
      position: "fixed",
      top: 0,
      right: 0,
      zIndex: 10000,
      padding: "15px 30px 15px 15px",
      background: "#fff",
      boxShadow: "0 0 6px rgba(0, 0, 0, .4)",
    });

    const $close = createElement("div", "&times;", {
      position: "absolute",
      top: "10px",
      right: "10px",
      display: "block",
      width: "15px",
      height: "15px",
      backgroundColor: "#ccc",
      border: "none",
      borderRadius: "50%",
      color: "#fff",
      fontSize: "14px",
      textAlign: "center",
      lineHeight: "15px",
      verticalAlign: "middle",
      cursor: "pointer"
    });

    $close.id = `${ID}__close`;
    $close.addEventListener("click", removePanel, false);

    const $title = $("title");
    const $description = $("meta[name='description']");
    const $keywords = $("meta[name='keywords']");

    if ($title) $panel.appendChild(createRowElement("Title : ", $title.textContent));
    if ($description) $panel.appendChild(createRowElement("Description : ", $description.getAttribute("content")));
    if ($keywords) $panel.appendChild(createRowElement("Keywords : ", $keywords.getAttribute("content")));

    $panel.id = ID;
    $panel.appendChild($close);
    document.body.appendChild($panel);
  }

  if ($(`#${ID}`)) removePanel();
  addPanel();
}());
void 0;
