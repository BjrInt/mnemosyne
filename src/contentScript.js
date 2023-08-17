'use strict';

import { hasFilesTable, isOnFilesPage, createPinOnAleph } from "./helpers";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

let hasMutated = false

const mo = new MutationObserver(() => {
  const filesTable = hasFilesTable()
  if(!isOnFilesPage() || !filesTable){
    return
  }

  if(!hasMutated){
    for (const child of filesTable.children) {
      const cidDiv = child.querySelector('button .relative:last-of-type .overflow-hidden>div')
      if(cidDiv){
        const fileDiv = child.querySelector('button>div:last-child')
        fileDiv.appendChild(createPinOnAleph(cidDiv.innerText))
      }
    }
    hasMutated = true
  }})
mo.observe(document, { childList: true, subtree: true })

