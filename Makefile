BIN = ./node_modules/.bin
BOWER = $(BIN)/bower
BOWERPATH = ./bower_components

# gh-pages
GHTMP = ../autoclasscss-gh-pages-tmp
GHLIB = vendor
VERSION = $(shell node -e "console.log(require('./bower.json').version)")

.PHONY: install doc gh-pages

install:
	npm install
	$(BOWER) install

doc:
	./bower_components/jsdoc/jsdoc autoclasscss.js -d jsdoc

gh-pages: doc
	mkdir -p $(GHTMP)/$(GHLIB)
	cp $(BOWERPATH)/jquery/jquery.min.js $(GHTMP)/$(GHLIB)/jquery.js
	cp -r $(BOWERPATH)/ace/src-min/ $(GHTMP)/$(GHLIB)/ace/
	cp $(BOWERPATH)/normalize-css/normalize.css $(GHTMP)/$(GHLIB)/normalize.css
	cp -r jsdoc $(GHTMP)/jsdoc
	rm $(GHTMP)/jsdoc/index.html
	mv $(GHTMP)/jsdoc/Autoclasscss.html $(GHTMP)/jsdoc/index.html
	cp autoclasscss.js $(GHTMP)/autoclasscss.js
	git checkout gh-pages
	cp -r $(GHTMP)/* ./
	rm -rf $(GHTMP)
	git add $(GHLIB) jsdoc autoclasscss.js
	git commit -m 'v$(VERSION)'
	git push origin gh-pages
	git checkout dev
