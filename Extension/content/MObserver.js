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
  const mutatedNode = mutatedList[0];
  if (mutatedNode.addedNodes.length > 0) {
    const targetNode = mutatedNode.target;
    const lastMutate = targetNode.children[targetNode.children.length - 1];
    if (lastMutate) msgLikeTwitch(lastMutate);
  }
}
