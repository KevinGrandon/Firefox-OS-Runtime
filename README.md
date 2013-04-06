Firefox-OS-Runtime
==================

A Firefox plugin which has several API mocks for rapid development on FFOS. This plugin provides the following:

* Proper permissions setup for WebAPI access
* Message proxying for chrome events (App launches, etc)
* Proxies mozCameras to mozGetUserMedia. Not all functionality is there yet.
* Stubs for settings and other things that might need them
* Implements hardware button shims for the home button


FirefoxOS Developers
-------------
You'll want to have Firefox nightly, along with a gaia checkout: (See: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_Gaia_in_Firefox)

You can add the plugin to your Firefox Nightly installation.

Download the current version here: https://github.com/KevinGrandon/Firefox-OS-Runtime/raw/master/firefox-os-runtime.xpi

After downloading, simply drag and drop the plugin on your Firefox Nightly and you will be prompted to install. An alternative method is to follow the developer method below.


Usage
-------------
* Press the 'Home' key to mimic the hardware home button. Mac users press fn + left arrow.
* You can use 'right-click' to mimic long taps on icons. We can clean this up in the future, but I wanted to avoid gaia changes for now.

Plugin Developers
-------------
We use cfx for plugin development. See here for additional details: https://addons.mozilla.org/en-US/developers/docs/sdk/1.13/dev-guide/tutorials/getting-started-with-cfx.html

Starting the environment
-------------
- Run the plugin using cfx. The --profiledir option should map to your gaia profile. In my case gaia and this repo are at the same level, so this works for me on a mac:
```
cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox --profiledir="../gaia/profile" --binary-args 'http://system.gaiamobile.org:8080'
```

A shortcut is enabled for this command:
```
make start
```
