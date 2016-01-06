(function() {
  const ID = "__tdk-panel__";

  function $(selector) {
    return document.querySelector(selector);
  }

  function className(str) {
    return ID + str;
  }

  function createElement(tagName, html) {
    const $el = document.createElement(tagName);
    $el.innerHTML = html;
    return $el;
  }

  function createRowElement(title, content) {
    const $el = createElement("div", ```
    <strong>${title}</strong><span>${content}</span>
    ```);
    $el.className = className("row");
    return $el;
  }

  function removePanel() {
    document.body.removeChild($(`#${ID}`));
  }

  function addPanel() {
    const $panel = createElement("div", "");
    const $close = createElement("div", "&times;");
    const $title = $("title");
    const $description = $("meta[name='description']");
    const $keywords = $("meta[name='keywords']");

    $panel.innerHTML = ```
    <style>
    #${ID} {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10000;
      background: rgba(38, 50, 56, 0.9);
    }
    </style>
    ```;

    $close.id = className("close");
    $close.addEventListener("click", removePanel, false);

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
