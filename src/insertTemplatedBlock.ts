import '@logseq/libs'
import {
  IBatchBlock,
} from '@logseq/libs/dist/LSPlugin.user';

import { parseDynamically } from './parser';

import { renderApp, valueArray } from './index';
import { persistUUID } from './insertUUID';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
export var networkRequest = false
export var stopStatus = true
export function editNetworkRequest(value) {
  networkRequest = value
}

export var data = null
const reg = /<%([^%].*?)%>/g
export var blockUuid2
export var sibling
var currentRun = 1
var previousRun = 0
async function triggerParse(obj) {
  if (obj.content) {
    let regexMatched = obj.content.match(reg)
    for (const x in regexMatched) {
      let toBeParsed = obj.content
      var currentMatch = regexMatched[x]
      let formattedMatch = await parseDynamically(currentMatch);
      let newRegexString = toBeParsed.replace(currentMatch, formattedMatch)
      obj.content = newRegexString
    }
  }
  currentRun += 1
  await obj.children.map(triggerParse)
}

export function triggerParseInitially(obj) {
  if (obj.content) {
    let regexMatched = obj.content.match(reg)
    for (const x in regexMatched) {
      var currentMatch = regexMatched[x]
      if (currentMatch.toLowerCase().includes("setinput:")) {
        valueArray.push({ variable: currentMatch.slice(2, -2).split(":")[1], name: "" })
      }
    }
  }
  obj.children.map(triggerParseInitially)
}

export async function insertProperlyTemplatedBlock(blockUuid3, template2, sibling3) {
  var query = `
  [:find (pull ?b [*])
 :where
 [?b :block/properties ?p]
 [(get ?p :template) ?ty]
 [(= "${template2}" ?ty)]]`
  blockUuid2 = blockUuid3
  sibling = sibling3
  let refUUID
  try {
    let ret = await logseq.DB.datascriptQuery(query)
    const results = ret?.flat()

    if (results && results.length > 0) {
      refUUID = results[0].uuid.$uuid$
      const origBlock = await logseq.Editor.getBlock(refUUID, {
        includeChildren: true,
      });
      data = origBlock
      triggerParseInitially(data)
      if (valueArray.length > 0) {
        renderApp()
        logseq.showMainUI()
      }
      else {
        logseq.hideMainUI({ restoreEditingCursor: true });
        insertProperlyTemplatedBlock2(blockUuid3, sibling3, origBlock)
      }
    }
  } catch (error) {
  }


}
export async function insertProperlyTemplatedBlock2(blockUuid, sibling2, origBlock) {
  data = origBlock
  function insertFinally() {
    logseq.Editor.insertBatchBlock(blockUuid, data.children as unknown as IBatchBlock, { sibling: (sibling2 === 'true') })
  }

  triggerParse(data)
  timeOutShouldBeSet()
  function checkDiff() {

    if (currentRun != previousRun) {
      previousRun = currentRun
      timeOutShouldBeSet()
    }
    else {
      if (networkRequest == true) {
        setTimeout(function () {
          checkDiff()
          networkRequest = false
        }, 500);
      }
      else {
        logseq.App.showMsg("Run has begun")
        insertFinally()
      }
    }
  }
  function timeOutShouldBeSet() {
    setTimeout(function () {
      checkDiff()
    }, 100);
  }
  if (origBlock.children.length === 0 || !origBlock.children) {
    logseq.App.showMsg("Whoops! Doesn't look like there's any content under the template.");
  }
}
  // }
  // catch (err) {
  //     console.log(err)
  //   }
  // }