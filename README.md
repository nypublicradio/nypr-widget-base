# `nypr-widget-base`

[![CircleCI][build-badge]][build]
[![npm package][npm-badge]][npm]

This component provides a base React class for NYPR engagement modules. It handles several shared bits:

- parses query string for UI variables
- looks up given theme for specific styles
- initializes Pym and responds to messages from the toolkit site

[build-badge]: https://img.shields.io/circleci/project/github/nypublicradio/nypr-widget-base/master.svg?style=flat-square
[build]: https://circleci.com/gh/nypublicradio/nypr-widget-base

[npm-badge]: https://img.shields.io/npm/v/nypr-widget-base.svg
[npm]: https://www.npmjs.com/package/nypr-widget-base

## Deploying

This is a React component generated using the `nwb` library. The source is written in JSX, which requires transpilation so it can be used by other React apps. The transpiled source is published to npm, but it is not checked into source control.

In order to publish an update, do the following:

- update the changelog
- `yarn version [patch|minor|major]`
- `yarn build`. This will generate a transpiled version of the source suitable for publishing.
- `yarn publish`
- `git push origin <tag>`. Don't forget to push the tag to github so it can be annotated and tracked.
