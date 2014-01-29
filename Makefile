test:
	./node_modules/.bin/mocha      \
	        --reporter spec        \
	        --ui tdd 			   \
	        ./test/*.js

doc:
	if test -d "./doc"; then rm -rf ./doc; fi
	./node_modules/.bin/yuidoc lib \
	        -o ./doc

.PHONY: test doc
