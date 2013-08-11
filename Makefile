BIN = ./node_modules/.bin
BOWER = $(BIN)/bower

.PHONY: install
install:
	npm install bower
	$(BOWER) install