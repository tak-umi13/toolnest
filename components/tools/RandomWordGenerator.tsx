"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// A curated pool of common English words for brainstorming, games and prompts.
const WORDS = "able acid aged also area army away baby back ball band bank base bath bear beat been beer bell belt best bird blow blue boat body bone book boom born boss both bowl bulk burn bush busy cake call calm came camp card care case cash cast cell chat chip city club coal coat code cold come cook cool cope copy core corn cost crew crop dark data date dawn days dead deal dean dear debt deep deer desk dial diet disc disk does done door dose down draw drew drop drug dual duke dust duty each earn ease east easy edge else even ever evil exit face fact fail fair fall farm fast fate fear feed feel feet fell felt file fill film find fine fire firm fish five flag flat flow food foot ford form fort four free from fuel full fund gain game gate gave gear gene gift girl give glad goal goat gold golf gone good gray grew grey grid grow gulf hair half hall hand hang hard harm hate have head hear heat held hell help here hero high hill hire hold hole holy home hope host hour huge hung hunt hurt idea inch into iron item jack jane jazz join jump jury just keen keep kept kick kind king knee knew know lack lady laid lake land lane last late lead left less life lift like line link list live load loan lock logo long look lord lose loss lost love luck made mail main make male mall many mark mass mate meal mean meat meet menu mere mike mile milk mill mind mine miss mode mood moon more most move much must name navy near neck need news next nice nick nine none nose note noun okay once only onto open oral over pace pack page paid pain pair palm park part pass past path peak pick pink pipe plan play plot plug plus poll pool poor port post pull pure push race rail rain rank rare rate read real rear rely rent rest rice rich ride ring rise risk road rock role roll roof room root rose rule rush ruth safe said sake sale salt same sand save seat seed seek seem seen self sell semi send sept ship shoe shop shot show shut sick side sign silk sing sink site size skin skip slip slow snow soft soil sold sole some song soon sort soul spot star stay step stop such sure swim tale talk tall tank tape task team tech tell tend term test text than that them then they thin this thus tide tidy time tiny told toll tone tony took tool tour town tree trip true tune turn twin type unit upon used user vary vast very vice view vote wage wait wake walk wall want ward warm wash wave ways weak wear week well went were west what when whom wide wife wild will wind wine wing wire wise wish with wood word wore work yard yeah year your zero zone".split(" ");

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function RandomWordGenerator() {
  const [count, setCount] = useState(5);
  const [capitalize, setCapitalize] = useState(false);
  const [list, setList] = useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(100, count));
    const out = Array.from({ length: n }, () => {
      const w = WORDS[Math.floor(Math.random() * WORDS.length)];
      return capitalize ? cap(w) : w;
    });
    setList(out);
  }

  return (
    <div>
      <div className="row">
        <div className="field"><label>How many words</label><input className="input" type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field" style={{ display: "flex", alignItems: "flex-end" }}>
          <label className="small"><input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} /> Capitalize</label>
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={generate}>Generate words</button>
      {list.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>Random words</label>
          <div className="tool-output" style={{ fontSize: "1.05rem" }}>{list.join(", ")}</div>
          <CopyButton value={list.join(", ")} className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Picks random common English words — handy for brainstorming, word games, writing prompts,
        passphrases and naming. Click again for a fresh set. Runs in your browser.
      </p>
    </div>
  );
}
