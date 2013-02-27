Firefox-OS-Runtime
==================

A Firefox plugin which has several API mocks for rapid development on FFOS.


Developers
-------------
We use cfx for plugin development. See here for additional details: https://addons.mozilla.org/en-US/developers/docs/sdk/1.13/dev-guide/tutorials/getting-started-with-cfx.html

You'll want to have Firefox nightly, along with a gaia checkout: (See: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_Gaia_in_Firefox)

Usage
-------------
- Run the plugin using cfx. The --profiledir option should map to your gaia profile. In my case gaia and this repo are at the same level, so this works for me on a mac:
```
cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox --profiledir="../gaia/profile" --binary-args 'http://system.gaiamobile.org:8080'
```
