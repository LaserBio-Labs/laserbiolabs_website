BUILD_DIR := public
SRC_DIR := ./
DIRS := public/images 

SRC_IMG := $(wildcard images/*) 
BUILD_IMG=$(patsubst %, $(BUILD_DIR)/%, $(SRC_IMG))


SRC_PAGES := \
	index.html 	 \
	catalog.html \
	how_to_order.html \
	faq.html \
	contact.html 

BUILD_PAGES :=  \
	public/index.html 	 \
	public/catalog.html \
	public/how_to_order.html \
	public/faq.html \
	public/contact.html 

DEP :=  \
	partials/nav.html \
	partials/head.html \
	partials/footer.html \
	style.css


.PHONY: all
all:  \
	dir_layout  \
	$(BUILD_PAGES)  \
	public/style.css  \
	$(BUILD_IMG) 

.PHONY: dir_layout
dir_layout: 
		@tput setaf 3; echo "==> Building directory layout"; tput sgr0
		@mkdir -vp $(DIRS)
	
public/images/%: images/%
		@tput setaf 3; echo "==> Copying images"; tput sgr0
		@cp -rf $< $@
		

$(BUILD_DIR)/%.html: $(SRC_DIR)/%.html $(DEP)
		@tput setaf 3; echo "==> Building $@"; tput sgr0
		@sed -Ee "s:\{\{(.*)\}\}:\1:e" $< > $@

public/style.css: style.css
		@tput setaf 3; echo "==> Building $@"; tput sgr0
		@cat $< > $@

.PHONY: clean
clean: 
		@tput setaf 3; echo "==> Cleaning up"; tput sgr0
		@rm -rf $(BUILD_DIR)
