VENDOR = vendor
JASMINE = 1.3.1
JQUERY = 1.10.2

.PHONY: install
install:
	mkdir $(VENDOR)
	make install-jasmine
	make install-jquery

.PHONY: install-jasmine
install-jasmine:
	curl http://cloud.github.com/downloads/pivotal/jasmine/jasmine-standalone-$(JASMINE).zip > $(VENDOR)/jasmine.zip
	unzip $(VENDOR)/jasmine.zip -d $(VENDOR)/jasmine/
	rm $(VENDOR)/jasmine.zip

.PHONY: jquery
install-jquery:
	curl http://code.jquery.com/jquery-$(JQUERY).min.js > $(VENDOR)/jquery.min.js

.PHONY: clean
clean:
	rm -rf $(VENDOR)