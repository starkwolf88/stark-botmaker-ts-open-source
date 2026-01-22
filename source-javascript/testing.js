var onGameTick = () => {
  var widget = client.getWidget(17694736);
  if (widget) {
    bot.printLogMessage('WIDGET SHOWING');
  } else {
    bot.printLogMessage('WIDGET NOT SHOWING');
  }
};
onGameTick();

