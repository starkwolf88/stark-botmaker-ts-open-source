function exampleJavaScriptFunction() {
  bot.printGameMessage('Hello from JavaScript!');
}

function onStart() {
  bot.printGameMessage('Executed JS onStart Method');
  exampleJavaScriptFunction();
}
function onGameTick() {}
function onNpcAnimationChanged(npc) {}
function onActorDeath(actor) {}
function onHitsplatApplied(actor, hitsplat) {}
function onInteractingChanged(sourceActor, targetActor) {}
function onChatMessage(type, name, message) {}

