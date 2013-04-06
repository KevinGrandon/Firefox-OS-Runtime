# Starts the plugin using CFX
firefox:
	/Applications/FirefoxNightly.app/Contents/MacOS/firefox -profile $(CURDIR)/profile http://system.gaiamobile.org:8080

# Starts the plugin using CFX
start:
	cfx run -b /Applications/FirefoxNightly.app/Contents/MacOS/firefox --profiledir='../gaia/profile' --binary-args 'http://system.gaiamobile.org:8080'

# Lint files
lint:
	@python ./linter/gjslint.py --nojsdoc -r data/
	@python ./linter/gjslint.py --nojsdoc -r lib/

# Creates our local profile from the gaia directory in the same directory
build:
	rm -rf profile/
	cd ../gaia; rm -rf profile
	cd ../gaia; DEBUG=1 make
	cd ../gaia; cp -R profile ../Firefox-OS-Runtime/.
	#rm -rf profile/extensions/httpd
	#rm profile/extensions/httpd@gaiamobile.org
	cfx xpi
	cp firefox-os-runtime.xpi profile/extensions/firefox-os-runtime@jetpack.xpi