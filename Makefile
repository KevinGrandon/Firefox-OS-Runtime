# Lint files
lint:
	@python ./linter/gjslint.py --nojsdoc -r data/
	@python ./linter/gjslint.py --nojsdoc -r lib/