Firefox-OS-Runtime
==================

A Firefox plugin which has several API mocks for rapid development on FFOS. This plugin provides the following:

* Proper permissions setup for WebAPI access
* Message proxying for chrome events (App launches, etc)
* Stubs for settings and other things that might need them


FirefoxOS Developers
-------------
You'll want to have Firefox nightly, along with a gaia checkout: (See: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_Gaia_in_Firefox)

You can add the plugin to your Firefox Nightly installation.

We recommend our current version, here: https://github.com/KevinGrandon/Firefox-OS-Runtime/raw/master/ffos-runtime.xpi

Or you can find the last released version here: https://addons.mozilla.org/en-US/firefox/addon/firefox-os-runtime/

Alternative method is to follow the developer method below:


Plugin Developers
-------------
We use cfx for plugin development. See here for additional details: https://addons.mozilla.org/en-US/developers/docs/sdk/1.13/dev-guide/tutorials/getting-started-with-cfx.html

Usage
-------------
- Run the plugin using cfx. The --profiledir option should map to your gaia profile. In my case gaia and this repo are at the same level, so this works for me on a mac:
```
cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox --profiledir="../gaia/profile" --binary-args 'http://system.gaiamobile.org:8080'
```

A shortcut is enabled for this command:
```
./start.sh
```