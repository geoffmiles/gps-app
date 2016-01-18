// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: '',
  name: '',
  description: 'Turn by turn navigation for convoying',
  author: 'Geoff Miles',
  email: 'geoff@geoff-miles.com',
  website: 'https://www.geoff-miles.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/icon-60.png',
  'iphone_2x': 'icons/icon-60@2x.png',
  'iphone_3x': 'icons/icon-60@3x.png',
  'ipad': 'icons/icon-60.png',
  'ippad_2x': 'icons/icon-60@2x.png',
  'android_ldpi': 'icons/icon-60.png',
  'android_mdpi': 'icons/icon-60@2x.png',
  'android_hdpi': 'icons/icon-60@3x.png',
  'android_xhdpi': 'icons/icon-60@4x.png',
});

App.launchScreens({
  'iphone': 'splash/Default~iphone.png',
  'iphone_2x': 'splash/Default@2x~iphone.png',
  'iphone5': 'splash/Default@3x~iphone.png',
  'iphone6': 'splash/Default~iphone.png',
  'iphone6p_portrait': 'splash/Default@2x~iphone.png',
  'iphone6p_landscape': 'splash/Default~iphone.png',
  'ipad_portait': 'splash/Default@2x~iphone.png',
  'ipad_portait_2x': 'splash/Default@3x~iphone.png',
  'ipad_landscape': 'splash/Default@4x~iphone.png',
  'ipad_landscape_2': 'splash/Default@4x~iphone.png',
  'android_ldpi_portrait': 'splash/Default@4x~iphone.png',
  'android_ldpi_landscape': 'splash/Default@4x~iphone.png',
  'android_mdpi_portrait': 'splash/Default@4x~iphone.png',
  'android_mdpi_landscape': 'splash/Default@4x~iphone.png',
  'android_hdpi_portrait': 'splash/Default@4x~iphone.png',
  'android_hdpi_landscape': 'splash/Default@4x~iphone.png',
  'android_xhdpi_portrait': 'splash/Default@4x~iphone.png',
  'android_xhdpi_landscape': 'splash/Default@4x~iphone.png',
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('Orientation', 'all', 'android');
