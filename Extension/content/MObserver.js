import { msgLikeTwitch } from "./MLikeT.js";

export default class MObserver extends MutationObserver {
  constructor(config) {
    super(makeLikeTwitch);
    this.config = config;
  }

  observe(targetNode) {
    super.observe(targetNode, this.config);
  }
}

function makeLikeTwitch(mutatedList) {
  const lastMutate = mutatedList[mutatedList.length - 1].addedNodes[0];
  if (lastMutate && lastMutate.parentNode) msgLikeTwitch(lastMutate.parentNode);
}
