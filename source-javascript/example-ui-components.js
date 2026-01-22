var globalScriptVariables = {
  uiCompleted: false
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function createBasicWindow(title) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new java.awt.FlowLayout();
  var buttons = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var callback = arguments.length > 5 ? arguments[5] : undefined;
  var frame = new javax.swing.JFrame(title);
  var panel = new javax.swing.JPanel(layout);
  var buttonMap = {};
  var mousePointer = java.awt.MouseInfo.getPointerInfo().getLocation();
  buttons.forEach(_ref => {
    var label = _ref.label,
      position = _ref.position;
    var button = new javax.swing.JButton(label);
    if (callback) {
      button.addActionListener(() => callback(label, button));
    }
    if (layout instanceof java.awt.BorderLayout && position) {
      panel.add(button, position);
    } else {
      panel.add(button);
    }
    buttonMap[label] = button;
  });
  frame.add(panel);
  frame.setSize(width, height);
  frame.setVisible(true);
  frame.setLocation(mousePointer.getX() - width / 2, mousePointer.getY() - height / 2);
  frame.setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
  frame.addWindowListener(new java.awt.event.WindowAdapter({
    windowClosing: () => {
      var response = javax.swing.JOptionPane.showConfirmDialog(frame, 'Are you sure you want to close this window?', 'Confirm Exit', javax.swing.JOptionPane.YES_NO_OPTION, javax.swing.JOptionPane.WARNING_MESSAGE);
      if (response === javax.swing.JOptionPane.YES_OPTION) {
        frame.dispose();
        bot.terminate();
      }
    }
  }));
  return {
    frame,
    panel,
    buttons: buttonMap
  };
}
function createTextFieldWithLabel(labelText, variableName, type) {
  var textFieldWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
  var labelColor = arguments.length > 4 ? arguments[4] : undefined;
  var textFieldColor = arguments.length > 5 ? arguments[5] : undefined;
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var label = new javax.swing.JLabel(labelText);
  label.setAlignmentX(javax.swing.JComponent.LEFT_ALIGNMENT);
  var cachedValue = type === 'string' ? bot.bmCache.getString(variableName, '') : bot.bmCache.getInt(variableName, 0);
  var textField = new javax.swing.JTextField(String(cachedValue), textFieldWidth);
  if (textFieldColor) {
    panel.setForeground(textFieldColor);
    textField.setBackground(textFieldColor);
  }
  if (labelColor) {
    label.setForeground(labelColor);
    textField.setForeground(labelColor);
    textField.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(labelColor, 1), javax.swing.BorderFactory.createEmptyBorder(5, 5, 5, 5)));
  }
  textField.addFocusListener(new java.awt.event.FocusListener({
    focusLost: () => {
      var enteredText = textField.getText().trim();
      if (type.includes('string')) {
        bot.bmCache.saveString(variableName, enteredText);
      } else if (type.includes('int')) {
        bot.bmCache.saveInt(variableName, Number(enteredText));
      }
    }
  }));
  panel.add(label, java.awt.BorderLayout.WEST);
  panel.add(textField, java.awt.BorderLayout.CENTER);
  return {
    panel,
    textField
  };
}
function createCheckboxLabel(checkboxLabel, checkboxVariableName) {
  var defaultChecked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var selectedTextColor = arguments.length > 3 ? arguments[3] : undefined;
  var tooltip = arguments.length > 4 ? arguments[4] : undefined;
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var isChecked = bot.bmCache.getBoolean(checkboxVariableName, defaultChecked);
  var checkbox = new javax.swing.JCheckBox(checkboxLabel, isChecked);
  if (selectedTextColor) {
    checkbox.setForeground(isChecked ? selectedTextColor.brighter() : selectedTextColor);
  }
  checkbox.addActionListener(() => {
    var selected = checkbox.isSelected();
    bot.bmCache.saveBoolean(checkboxVariableName, selected);
    if (selectedTextColor) {
      if (selected) {
        checkbox.setForeground(selectedTextColor.brighter());
      } else {
        checkbox.setForeground(selectedTextColor);
      }
    }
  });
  if (tooltip) {
    checkbox.setToolTipText(tooltip);
  }
  panel.add(checkbox);
  return {
    panel,
    checkbox
  };
}
function createLabel(title) {
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new java.awt.Font('SansSerif', java.awt.Font.PLAIN, 12);
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : java.awt.Color.BLACK;
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var label = new javax.swing.JLabel(title);
  label.setFont(font);
  label.setForeground(color);
  panel.add(label);
  return {
    panel,
    label
  };
}
function createButton(buttonText, onClick, backgroundColor, foregroundColor, tooltip) {
  var enabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var button = new javax.swing.JButton(buttonText);
  button.addActionListener(() => {
    onClick();
    bot.printGameMessage('Button clicked');
  });
  if (backgroundColor) {
    button.setBackground(backgroundColor);
  }
  if (foregroundColor) {
    button.setForeground(foregroundColor);
  }
  {
    button.setToolTipText(tooltip);
  }
  button.setEnabled(enabled);
  panel.add(button);
  return {
    panel,
    button
  };
}
function createDropdown(labelText, variableName, options, defaultOption, textColor) {
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var label = new javax.swing.JLabel(labelText);
  if (textColor) {
    label.setForeground(textColor);
  }
  fixHeight(label);
  panel.add(label, java.awt.BorderLayout.WEST);
  var cachedValue = bot.bmCache.getString(variableName, defaultOption);
  var comboBox = new javax.swing.JComboBox(options);
  comboBox.setSelectedItem(cachedValue);
  if (textColor) {
    comboBox.setForeground(textColor);
  }
  comboBox.addActionListener(() => {
    var selected = comboBox.getSelectedItem();
    bot.bmCache.saveString(variableName, selected);
  });
  fixHeight(comboBox);
  panel.add(comboBox, java.awt.BorderLayout.CENTER);
  return {
    panel,
    comboBox
  };
}
function createRadioButtons(radioLabels, variableName, textColor) {
  var panel = new javax.swing.JPanel(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
  var cachedValue = bot.bmCache.getString(variableName, '');
  var radioButtonGroup = new javax.swing.ButtonGroup();
  var _iterator = _createForOfIteratorHelper(radioLabels),
    _step;
  try {
    var _loop = function _loop() {
      var radioLabel = _step.value;
      var isSelected = JSON.stringify(cachedValue).toLocaleLowerCase().normalize() === JSON.stringify(radioLabel).toLocaleLowerCase().normalize();
      var radioButton = new javax.swing.JRadioButton(radioLabel, isSelected);
      radioButtonGroup.add(radioButton);
      if (textColor) {
        radioButton.setForeground(textColor);
      }
      radioButton.addActionListener(() => {
        bot.bmCache.saveString(variableName, radioLabel);
      });
      panel.add(radioButton);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    panel
  };
}
function createTextArea(labelText, variableName) {
  var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var columns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
  var editable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var lineWrap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var wrapStyleWord = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  var tooltip = arguments.length > 7 ? arguments[7] : undefined;
  var panel = new javax.swing.JPanel(new java.awt.BorderLayout());
  var label = new javax.swing.JLabel(labelText);
  fixHeight(label);
  panel.add(label, java.awt.BorderLayout.NORTH);
  var cachedValue = bot.bmCache.getString(variableName, '');
  var textArea = new javax.swing.JTextArea(cachedValue, rows, columns);
  textArea.setEditable(editable);
  textArea.setLineWrap(lineWrap);
  textArea.setWrapStyleWord(wrapStyleWord);
  if (tooltip) {
    textArea.setToolTipText(tooltip);
  }
  textArea.addFocusListener(new java.awt.event.FocusListener({
    focusLost: () => {
      var text = textArea.getText();
      bot.bmCache.saveString(variableName, text);
    }
  }));
  var scrollPane = new javax.swing.JScrollPane(textArea);
  scrollPane.setVerticalScrollBarPolicy(javax.swing.ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
  scrollPane.setHorizontalScrollBarPolicy(javax.swing.ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
  panel.add(scrollPane, java.awt.BorderLayout.CENTER);
  return {
    panel,
    textArea,
    scrollPane
  };
}
function createPanel() {
  var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'FlowLayout';
  var layoutOptions = arguments.length > 1 ? arguments[1] : undefined;
  var padding = arguments.length > 2 ? arguments[2] : undefined;
  var border = arguments.length > 3 ? arguments[3] : undefined;
  var panel = new javax.swing.JPanel();
  switch (layout) {
    case 'FlowLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.flowLayout) {
          var _layoutOptions$flowLa, _layoutOptions$flowLa2;
          panel.setLayout(new java.awt.FlowLayout((_layoutOptions$flowLa = layoutOptions.flowLayout.horizontalGap) !== null && _layoutOptions$flowLa !== void 0 ? _layoutOptions$flowLa : 0, (_layoutOptions$flowLa2 = layoutOptions.flowLayout.verticalGap) !== null && _layoutOptions$flowLa2 !== void 0 ? _layoutOptions$flowLa2 : 0));
        } else {
          panel.setLayout(new java.awt.FlowLayout());
        }
        break;
      }
    case 'BorderLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.borderLayout) {
          var _layoutOptions$border, _layoutOptions$border2;
          panel.setLayout(new java.awt.BorderLayout((_layoutOptions$border = layoutOptions.borderLayout.hgap) !== null && _layoutOptions$border !== void 0 ? _layoutOptions$border : 0, (_layoutOptions$border2 = layoutOptions.borderLayout.vgap) !== null && _layoutOptions$border2 !== void 0 ? _layoutOptions$border2 : 0));
        } else {
          panel.setLayout(new java.awt.BorderLayout());
        }
        break;
      }
    case 'BoxLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.boxLayout) {
          panel.setLayout(new javax.swing.BoxLayout(panel, layoutOptions.boxLayout.axis));
        } else {
          panel.setLayout(new javax.swing.BoxLayout(panel, 1));
        }
        break;
      }
    case 'GridLayout':
      {
        if (layoutOptions !== null && layoutOptions !== void 0 && layoutOptions.gridLayout) {
          var _layoutOptions$gridLa, _layoutOptions$gridLa2, _layoutOptions$gridLa3, _layoutOptions$gridLa4;
          panel.setLayout(new java.awt.GridLayout((_layoutOptions$gridLa = (_layoutOptions$gridLa2 = layoutOptions.gridLayout) === null || _layoutOptions$gridLa2 === void 0 ? void 0 : _layoutOptions$gridLa2.rows) !== null && _layoutOptions$gridLa !== void 0 ? _layoutOptions$gridLa : 0, (_layoutOptions$gridLa3 = (_layoutOptions$gridLa4 = layoutOptions.gridLayout) === null || _layoutOptions$gridLa4 === void 0 ? void 0 : _layoutOptions$gridLa4.columns) !== null && _layoutOptions$gridLa3 !== void 0 ? _layoutOptions$gridLa3 : 0));
          break;
        } else {
          panel.setLayout(new java.awt.GridLayout(0, 0));
        }
        break;
      }
    default:
      {
        panel.setLayout(new java.awt.FlowLayout());
        break;
      }
  }
  if (padding) {
    panel.setBorder(javax.swing.BorderFactory.createEmptyBorder(padding.top, padding.left, padding.bottom, padding.right));
  } else {
    panel.setBorder(javax.swing.BorderFactory.createEmptyBorder(5, 5, 5, 5));
  }
  if (border) {
    panel.setBorder(border);
  }
  return panel;
}
function createSplitPane(firstComponent, secondComponent) {
  var orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontal';
  var splitPane = new javax.swing.JSplitPane(orientation === 'horizontal' ? javax.swing.JSplitPane.HORIZONTAL_SPLIT : javax.swing.JSplitPane.VERTICAL_SPLIT);
  splitPane.setLeftComponent(firstComponent);
  splitPane.setRightComponent(secondComponent);
  splitPane.setResizeWeight(0.5);
  splitPane.setBorder(null);
  splitPane.setOneTouchExpandable(true);
  splitPane.setContinuousLayout(true);
  splitPane.setDividerLocation(0.5);
  return splitPane;
}
function fixHeight(c) {
  var pref = c.getPreferredSize();
  c.setMaximumSize(new java.awt.Dimension(java.lang.Integer.MAX_VALUE, pref.height));
}

var SWING_UI_SUMMARY = "Swing UI Summary    \n\nTo summarize the work we have done, we have created a Swing UI that allows you to create and manage your UI components.\n\nThe helper functions are designed to allow for simple UI element, while incorporating methods for caching values directly to the bmCache, without much additional effort.\n\nThe example panel is there to offer some insight in to how the Swing UI can be used, and is by no means a comprehensive example of the Swing UI.\nThere are many additional changes available for you to leverage, and personalize based on your own design choices. This was done to offer a starting point for you to build upon, and is not intended to be a complete solution.\n\nI highly suggest you spend some time exploring the helper functions, and understanding how they work.\n\nNot all of the Swing UI elements are fully typed, and may require you to either type cast them yourself, or open a PR request on the Types repository to make the changes yourself.\nTo test the changes locally, simply clone the Types repository, and run the following command to link it to the local repository\n\npnpm link 'Your directory path to the osrs-botmaker-types repository'\npnpm i\n\nOnce you've made changes to the types repository, simply run the following within the Types repository to build the changes:\npnpm build\n\nUpon validation that the types work, I suggest you make a PR request to the Types repository to have the changes merged, for all to enjoy and benefit from.\n\nOnce your changes are merged, you will be able to update the Types version to that on the Types repository and once again, running pnpm i to update the dependencies.\n\n-bik\n";

var COLOR_SCHEME = {
  BACKGROUND: new java.awt.Color(0x1b1b1b),
  PANEL: new java.awt.Color(0x282828),
  ACCENT: new java.awt.Color(0xdc8a00),
  TEXT: new java.awt.Color(0xffffff)
};
var createUi = () => {
  var _createBasicWindow = createBasicWindow('Helper Functions Showcase', 800, 700, new java.awt.BorderLayout()),
    frame = _createBasicWindow.frame,
    panel = _createBasicWindow.panel;
  panel.setBackground(COLOR_SCHEME.BACKGROUND);
  var tabbedPanel = new javax.swing.JTabbedPane();
  tabbedPanel.setTabPlacement(javax.swing.JTabbedPane.TOP);
  tabbedPanel.setBackground(COLOR_SCHEME.BACKGROUND);
  tabbedPanel.setForeground(COLOR_SCHEME.TEXT);
  var examplePanel = createExamplePanel();
  tabbedPanel.addTab('Example Panel', examplePanel);
  var jListPanel = createPanel('BorderLayout', {
    borderLayout: {
      hgap: 15,
      vgap: 15
    }
  }, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('JList Examples'));
  var temporaryList = new javax.swing.JList(['Test', 'Test 2', 'Test 3']);
  var temporaryScrollPane = new javax.swing.JScrollPane(temporaryList);
  jListPanel.add(temporaryScrollPane, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('JList Examples', jListPanel);
  var textFieldPanel = createPanel('BorderLayout', {
    borderLayout: {
      hgap: 15,
      vgap: 15
    }
  }, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Text Field Examples'));
  var temporaryTextField = createTextFieldWithLabel('Test', 'test', 'int', 10, COLOR_SCHEME.ACCENT, COLOR_SCHEME.BACKGROUND);
  textFieldPanel.add(temporaryTextField.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Text Field Examples', textFieldPanel);
  var checkboxLabelPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Checkbox Label Examples'));
  var temporaryCheckboxLabel = createCheckboxLabel('Test', 'test', true, COLOR_SCHEME.TEXT, 'Test tooltip');
  checkboxLabelPanel.add(temporaryCheckboxLabel.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Checkbox Label Examples', checkboxLabelPanel);
  var labelPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Label Examples'));
  var temporaryLabel = createLabel('Test');
  labelPanel.add(temporaryLabel.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Label Examples', labelPanel);
  var buttonPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Button Examples'));
  var button = createButton('Test', () => {
    bot.printGameMessage('Button clicked');
  }, COLOR_SCHEME.ACCENT, COLOR_SCHEME.TEXT, 'Test tooltip', true);
  buttonPanel.add(button.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Button Examples', buttonPanel);
  var dropdownPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Dropdown Examples'));
  var temporaryDropdown = createDropdown('Test', 'test', ['Test', 'Test 2', 'Test 3'], 'Test', COLOR_SCHEME.TEXT);
  dropdownPanel.add(temporaryDropdown.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Dropdown Examples', dropdownPanel);
  var radioButtonPanel = createPanel('BoxLayout', {
    boxLayout: {
      axis: javax.swing.BoxLayout.Y_AXIS
    }
  }, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Radio Button Examples'));
  var temporaryRadioButtons = createRadioButtons(['Test Radio Button A', 'Test Radio Button B', 'Test Radio Button C'], 'radioGroupTest', COLOR_SCHEME.TEXT);
  radioButtonPanel.add(temporaryRadioButtons.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Radio Button Examples', radioButtonPanel);
  var textAreaPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Text Area Examples'));
  var temporaryTextArea = createTextArea('Test Title', 'testVariable', 10, 30, true, false, true, 'Test tooltip');
  textAreaPanel.add(temporaryTextArea.panel, java.awt.BorderLayout.CENTER);
  tabbedPanel.addTab('Text Area Examples', textAreaPanel);
  panel.add(tabbedPanel, java.awt.BorderLayout.CENTER);
  panel.revalidate();
  panel.repaint();
  return frame;
};
var createExamplePanel = () => {
  var examplePanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Example Panel with all components'));
  examplePanel.setBackground(COLOR_SCHEME.BACKGROUND);
  examplePanel.setForeground(COLOR_SCHEME.TEXT);
  var mainScriptSettingsPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Script Settings'));
  mainScriptSettingsPanel.setBackground(COLOR_SCHEME.BACKGROUND);
  mainScriptSettingsPanel.setForeground(COLOR_SCHEME.TEXT);
  var exampleScriptSettingsPanelNorth = createPanel('GridLayout', {
    gridLayout: {
      rows: 0,
      columns: 1
    }
  }, undefined, javax.swing.BorderFactory.createTitledBorder('Example Script Settings (North)'));
  exampleScriptSettingsPanelNorth.setBackground(COLOR_SCHEME.BACKGROUND);
  exampleScriptSettingsPanelNorth.setForeground(COLOR_SCHEME.TEXT);
  var exampleBankPinTextField = createTextFieldWithLabel('Bank Pin: ', 'bankPinCachedVariable', 'string', 10, COLOR_SCHEME.ACCENT, COLOR_SCHEME.BACKGROUND).panel;
  exampleScriptSettingsPanelNorth.add(exampleBankPinTextField);
  var exampleEnableBankingCheckbox = createCheckboxLabel('Enable Banking', 'enableBankingCachedVariable', false, COLOR_SCHEME.ACCENT, 'Test tooltip').panel;
  var exampleScriptSettingsComboBox = createDropdown('Script Settings', 'scriptSettingsCachedVariable', ['Test', 'Test 2', 'Test 3'], 'Test', COLOR_SCHEME.ACCENT).panel;
  exampleScriptSettingsPanelNorth.add(exampleScriptSettingsComboBox);
  exampleScriptSettingsPanelNorth.add(exampleEnableBankingCheckbox);
  mainScriptSettingsPanel.add(exampleScriptSettingsPanelNorth, java.awt.BorderLayout.NORTH);
  var scriptStartPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Script Start'));
  scriptStartPanel.setBackground(COLOR_SCHEME.BACKGROUND);
  scriptStartPanel.setForeground(COLOR_SCHEME.TEXT);
  var startButton = createButton('Start', () => {
    bot.printGameMessage("If this was not an example, this would dispose the frame and begin the script execution.");
    globalScriptVariables.uiCompleted = true;
  }, COLOR_SCHEME.ACCENT, COLOR_SCHEME.TEXT, 'Test tooltip', true).panel;
  scriptStartPanel.add(startButton, java.awt.BorderLayout.CENTER);
  mainScriptSettingsPanel.add(scriptStartPanel, java.awt.BorderLayout.CENTER);
  var panelSummaryPanel = createPanel('BorderLayout', undefined, {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15
  }, javax.swing.BorderFactory.createTitledBorder('Panel Summary'));
  panelSummaryPanel.setBackground(COLOR_SCHEME.BACKGROUND);
  panelSummaryPanel.setForeground(COLOR_SCHEME.TEXT);
  var panelSummaryTextArea = createTextArea('', 'panelSummaryCachedVariable', undefined, undefined, false, true, true);
  panelSummaryTextArea.textArea.setText(SWING_UI_SUMMARY);
  panelSummaryTextArea.textArea.setBackground(COLOR_SCHEME.BACKGROUND);
  panelSummaryTextArea.textArea.setForeground(COLOR_SCHEME.TEXT);
  panelSummaryTextArea.textArea.setFont(new java.awt.Font('Monospaced', java.awt.Font.PLAIN, 12));
  panelSummaryTextArea.textArea.setBorder(javax.swing.BorderFactory.createCompoundBorder(javax.swing.BorderFactory.createLineBorder(COLOR_SCHEME.ACCENT, 1), javax.swing.BorderFactory.createEmptyBorder(10, 10, 10, 10)));
  panelSummaryTextArea.textArea.setOpaque(false);
  panelSummaryTextArea.textArea.setOpaque(false);
  panelSummaryPanel.add(panelSummaryTextArea.panel, java.awt.BorderLayout.CENTER);
  var splitPane = createSplitPane(mainScriptSettingsPanel, panelSummaryPanel);
  examplePanel.add(splitPane, java.awt.BorderLayout.CENTER);
  return examplePanel;
};

function exampleJavaScriptFunction() {
  bot.printGameMessage('Hello from JavaScript!');
}

function onStart() {
  bot.printGameMessage('Executed JS onStart Method');
  exampleJavaScriptFunction();
  createUi();
}
function onGameTick() {
  if (!globalScriptVariables.uiCompleted) {
    return;
  }
  bot.printGameMessage("UI Completed! We are now executing within the game tick loop");
}
function onNpcAnimationChanged(npc) {}
function onActorDeath(actor) {}
function onHitsplatApplied(actor, hitsplat) {}
function onInteractingChanged(sourceActor, targetActor) {}
function onChatMessage(type, name, message) {}

