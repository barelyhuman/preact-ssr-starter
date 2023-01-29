import viewEngine from "./modules/view-engine";

export default function (app) {
  return [viewEngine].filter((x) => typeof x == "function");
}
