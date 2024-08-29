
install:
	bun install

lint:
	bun run lint

build: install lint
	rm -rf dist
	bun run build

publish: build
	npm publish



