BIN = ./node_modules/.bin
BOWER = $(BIN)/bower

.PHONY: install doc

install:
	npm install bower
	$(BOWER) install

doc:
	./bower_components/jsdoc/jsdoc autoclasscss.js -d jsdoc