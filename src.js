(function() {
  const ID = "__tdk-panel__";
  const isInitialTDKPanel = typeof window[ID] === "undefined";
  const TDKPanel = window[ID] || {};
  window[ID] = TDKPanel;

  function $(selector) {
    return document.querySelector(selector);
  }

  function p(str) {
    return ID + str;
  }

  function createElement(tagName, html) {
    const $el = document.createElement(tagName);
    $el.innerHTML = html;
    return $el;
  }

  function createRowElement(title, content) {
    const $el = createElement("div", ` <strong>${title}</strong><span>${content}</span>`);
    $el.className = p("row");
    return $el;
  }

  if (isInitialTDKPanel) {
    TDKPanel.handleKeyup = e => {
      if (e.keyCode === 27) {
        e.preventDefault();
        TDKPanel.removePanel();
      }
    };

    TDKPanel.removePanel = () => {
      const $panel = $(`#${ID}`);
      if ($panel) {
        document.body.removeChild($(`#${ID}`));
      }
      document.removeEventListener("keyup", TDKPanel.handleKeyup, false);
    };

    TDKPanel.addPanel = () => {
      const $panel = createElement("div", "");
      const $close = createElement("div", "&times;");
      const $title = $("title");
      const $description = $("meta[name='description']");
      const $keywords = $("meta[name='keywords']");

      $panel.innerHTML = `
      <style>
      #${ID} {
        position: fixed;
        top: 5px;
        right: 5px;
        z-index: 999999;
        padding: 5px 20px;
        background: rgba(38, 50, 56, .96);
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        text-align: left;
      }
      #${ID} * {
        text-align: inherit;
      }
      #${p("close")} {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        font-family: sans-serif;
        line-height: 18px;
        text-align: center;
        cursor: pointer;
      }
      #${ID} .${p("row")} {
        padding: 5px 0;
      }
      #${ID} .${p("row")} + .${p("row")} {
        border-top: 1px solid #37474f;
      }
      #${ID} .${p("row")} > strong,
      #${ID} .${p("row")} > span {
        color: #fff;
        font-size: 12px;
        font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
        vertical-align: baseline;
        line-height: 1.4;
      }
      #${ID} .${p("row")} > strong {
        font-weight: bold;
      }
      </style>
      `;

      $close.id = p("close");
      $close.addEventListener("click", TDKPanel.removePanel, false);

      if ($title) $panel.appendChild(createRowElement("Title : ", $title.textContent));
      if ($description) $panel.appendChild(createRowElement("Description : ", $description.getAttribute("content")));
      if ($keywords) $panel.appendChild(createRowElement("Keywords : ", $keywords.getAttribute("content")));

      $panel.id = ID;
      $panel.appendChild($close);
      document.body.appendChild($panel);
      document.addEventListener("keyup", TDKPanel.handleKeyup, false);
    };

  } else {
    TDKPanel.removePanel();
  }

  TDKPanel.addPanel();
}());
void 0;
