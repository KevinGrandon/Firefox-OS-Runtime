Firefox-OS-Runtime
==================

A Firefox plugin which has several API mocks for rapid development on FFOS.

Requirements
-------------
- cfx addon: https://addons.mozilla.org/en-US/developers/docs/sdk/1.13/dev-guide/tutorials/getting-started-with-cfx.html
- Firefox nightly and gaia: (See: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_Gaia_in_Firefox)

Usage
-------------
- Run the plugin using cfx. The --profiledir option should map to your gaia profile. In my case gaia and this repo are at the same level, so this works for me on a mac:
```
cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox --profiledir="../gaia/profile" --binary-args 'http://system.gaiamobile.org:8080'
```


Developers
-------------

I generally work inside of nightly, and I've found using the builder addon is easiest: https://builder.addons.mozilla.org/package/175585/latest/

We're going to keep the builder addon fully up-to-date with the github code for now. This could change if people want to start contributing.